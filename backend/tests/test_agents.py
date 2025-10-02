"""
Test cases for agent functionality.

This module contains test cases for all learning companion agents
including content generation, assessment, and orchestration.
"""

import pytest
from typing import Dict, Any

from agents import ContentGeneratorAgent, AssessmentAgent, orchestrator


class TestContentGeneratorAgent:
    """Test cases for the Content Generator Agent."""
    
    @pytest.mark.asyncio
    async def test_agent_initialization(self):
        """Test that the content generator agent initializes properly."""
        agent = ContentGeneratorAgent()
        # Mock initialization since we don't have actual AWS credentials
        agent.is_active = True
        
        assert agent.name == "Content Generator"
        assert agent.is_active
        assert "explain_topic" in agent.get_capabilities()
    
    @pytest.mark.asyncio
    async def test_content_generation_request(self):
        """Test content generation request processing."""
        agent = ContentGeneratorAgent()
        agent.is_active = True
        agent.is_initialized = True
        
        request = {
            "action": "explain",
            "topic": "quadratic equations",
            "difficulty": "intermediate"
        }
        
        response = await agent.process_request(request)
        
        assert response.success
        assert response.data is not None
        assert "content" in response.data
    
    @pytest.mark.asyncio
    async def test_invalid_request(self):
        """Test handling of invalid requests."""
        agent = ContentGeneratorAgent()
        agent.is_active = True
        
        request = {
            "action": "explain"
            # Missing required 'topic' field
        }
        
        response = await agent.process_request(request)
        
        assert not response.success
        assert "required" in response.message.lower()


class TestAssessmentAgent:
    """Test cases for the Assessment Agent."""
    
    @pytest.mark.asyncio
    async def test_agent_initialization(self):
        """Test that the assessment agent initializes properly."""
        agent = AssessmentAgent()
        # Mock initialization
        agent.is_active = True
        
        assert agent.name == "Assessment Agent"
        assert agent.is_active
        assert "evaluate_responses" in agent.get_capabilities()
    
    @pytest.mark.asyncio
    async def test_response_evaluation(self):
        """Test evaluation of user responses."""
        agent = AssessmentAgent()
        agent.is_active = True
        
        request = {
            "action": "evaluate",
            "user_id": "test_user",
            "responses": [
                {"question": "What is 2+2?", "answer": "4", "correct": True}
            ]
        }
        
        response = await agent.process_request(request)
        
        assert response.success
        assert response.data is not None
        assert "score" in response.data
    
    @pytest.mark.asyncio
    async def test_progress_analysis(self):
        """Test learning progress analysis."""
        agent = AssessmentAgent()
        agent.is_active = True
        
        request = {
            "action": "progress",
            "user_id": "test_user"
        }
        
        response = await agent.process_request(request)
        
        assert response.success
        assert response.data is not None
        assert "overall_progress" in response.data


class TestAgentOrchestrator:
    """Test cases for the Agent Orchestrator."""
    
    @pytest.mark.asyncio
    async def test_orchestrator_initialization(self, initialized_orchestrator):
        """Test orchestrator initialization."""
        assert initialized_orchestrator.is_initialized
        assert "content_generator" in initialized_orchestrator.agents
        assert "assessment" in initialized_orchestrator.agents
    
    @pytest.mark.asyncio
    async def test_request_routing(self, initialized_orchestrator):
        """Test automatic request routing to appropriate agents."""
        # Test content generation routing
        content_request = {
            "action": "explain",
            "topic": "test topic",
            "difficulty": "beginner"
        }
        
        response = await initialized_orchestrator.process_request(content_request)
        assert response.data["processed_by"] == "content_generator"
        
        # Test assessment routing
        assessment_request = {
            "action": "evaluate",
            "user_id": "test_user",
            "responses": []
        }
        
        response = await initialized_orchestrator.process_request(assessment_request)
        assert response.data["processed_by"] == "assessment"
    
    @pytest.mark.asyncio
    async def test_system_status(self, initialized_orchestrator):
        """Test system status reporting."""
        status = await initialized_orchestrator.get_system_status()
        
        assert status["orchestrator_initialized"] is True
        assert "agents" in status
        assert len(status["agents"]) > 0
        
        for agent_name, agent_info in status["agents"].items():
            assert "name" in agent_info
            assert "capabilities" in agent_info
            assert isinstance(agent_info["capabilities"], list)
    
    @pytest.mark.asyncio
    async def test_explicit_agent_targeting(self, initialized_orchestrator):
        """Test explicit agent targeting in requests."""
        request = {
            "agent": "content_generator",
            "action": "explain",
            "topic": "test topic"
        }
        
        response = await initialized_orchestrator.process_request(request)
        
        assert response.success
        assert response.data["processed_by"] == "content_generator"