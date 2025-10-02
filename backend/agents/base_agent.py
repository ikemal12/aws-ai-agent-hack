"""
Base agent class for all learning companion agents.

This module defines the abstract base class that all specialized agents
inherit from, providing a common interface and shared functionality.
"""

from abc import ABC, abstractmethod
from typing import Any, Dict, List, Optional
from pydantic import BaseModel


class AgentResponse(BaseModel):
    """Standard response format for all agents."""
    success: bool
    message: str
    data: Optional[Dict[str, Any]] = None
    confidence: Optional[float] = None
    suggestions: Optional[List[str]] = None


class BaseAgent(ABC):
    """
    Abstract base class for all learning companion agents.
    
    Each agent specializes in a specific aspect of the learning experience,
    such as content generation, assessment, or personalization.
    """
    
    def __init__(self, name: str, description: str):
        self.name = name
        self.description = description
        self.is_active = True
    
    @abstractmethod
    async def process_request(self, request: Dict[str, Any]) -> AgentResponse:
        """
        Process a request and return a structured response.
        
        Args:
            request: Dictionary containing the request data
            
        Returns:
            AgentResponse: Structured response from the agent
        """
        pass
    
    @abstractmethod
    async def initialize(self) -> bool:
        """
        Initialize the agent with required resources.
        
        Returns:
            bool: True if initialization successful, False otherwise
        """
        pass
    
    async def health_check(self) -> bool:
        """
        Check if the agent is healthy and ready to process requests.
        
        Returns:
            bool: True if healthy, False otherwise
        """
        return self.is_active
    
    def get_capabilities(self) -> List[str]:
        """
        Get a list of capabilities this agent provides.
        
        Returns:
            List[str]: List of capability names
        """
        return []