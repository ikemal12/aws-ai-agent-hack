"""
Agent orchestrator for managing multiple learning companion agents.

This module coordinates interactions between different agents and
manages the overall workflow of the learning companion system.
"""

from typing import Any, Dict, List, Optional
from loguru import logger

from .base_agent import BaseAgent, AgentResponse
from .content_generator import ContentGeneratorAgent
from .assessment_agent import AssessmentAgent


class AgentOrchestrator:
    """
    Orchestrates multiple agents to provide comprehensive learning support.
    
    The orchestrator manages agent lifecycle, routes requests to appropriate
    agents, and coordinates multi-agent workflows.
    """
    
    def __init__(self):
        self.agents: Dict[str, BaseAgent] = {}
        self.is_initialized = False
    
    async def initialize(self) -> bool:
        """Initialize all agents."""
        try:
            # Initialize individual agents
            self.agents["content_generator"] = ContentGeneratorAgent()
            self.agents["assessment"] = AssessmentAgent()
            
            # Initialize each agent
            for name, agent in self.agents.items():
                success = await agent.initialize()
                if not success:
                    logger.error(f"Failed to initialize agent: {name}")
                    return False
            
            self.is_initialized = True
            logger.info("Agent orchestrator initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize agent orchestrator: {e}")
            return False
    
    async def process_request(self, request: Dict[str, Any]) -> AgentResponse:
        """
        Process a request by routing it to the appropriate agent(s).
        
        Args:
            request: Dictionary containing:
                - agent: Target agent name (optional, will auto-route if not specified)
                - action: Action to perform
                - payload: Request data
        """
        if not self.is_initialized:
            return AgentResponse(
                success=False,
                message="Orchestrator not initialized"
            )
        
        try:
            agent_name = request.get("agent")
            action = request.get("action")
            
            # Auto-route based on action if agent not specified
            if not agent_name:
                agent_name = self._route_request(action)
            
            if agent_name not in self.agents:
                return AgentResponse(
                    success=False,
                    message=f"Unknown agent: {agent_name}"
                )
            
            agent = self.agents[agent_name]
            if not await agent.health_check():
                return AgentResponse(
                    success=False,
                    message=f"Agent {agent_name} is not healthy"
                )
            
            # Process the request
            response = await agent.process_request(request)
            
            # Add orchestrator metadata
            if response.data is None:
                response.data = {}
            response.data["processed_by"] = agent_name
            response.data["orchestrator_version"] = "1.0.0"
            
            return response
            
        except Exception as e:
            logger.error(f"Error in orchestrator: {e}")
            return AgentResponse(
                success=False,
                message=f"Orchestrator error: {str(e)}"
            )
    
    def _route_request(self, action: str) -> str:
        """Route request to appropriate agent based on action."""
        content_actions = ["explain", "quiz", "summary", "generate"]
        assessment_actions = ["evaluate", "progress", "recommend", "assess"]
        
        if any(a in action for a in content_actions):
            return "content_generator"
        elif any(a in action for a in assessment_actions):
            return "assessment"
        else:
            # Default to content generator
            return "content_generator"
    
    async def get_system_status(self) -> Dict[str, Any]:
        """Get status of all agents."""
        status = {
            "orchestrator_initialized": self.is_initialized,
            "agents": {}
        }
        
        for name, agent in self.agents.items():
            status["agents"][name] = {
                "name": agent.name,
                "description": agent.description,
                "healthy": await agent.health_check(),
                "capabilities": agent.get_capabilities()
            }
        
        return status
    
    async def shutdown(self):
        """Shutdown all agents gracefully."""
        logger.info("Shutting down agent orchestrator")
        for name, agent in self.agents.items():
            try:
                agent.is_active = False
                logger.info(f"Shutdown agent: {name}")
            except Exception as e:
                logger.error(f"Error shutting down agent {name}: {e}")
        
        self.is_initialized = False


# Global orchestrator instance
orchestrator = AgentOrchestrator()