"""
Test configuration and fixtures for the Multi-Agent Study Companion backend.

This module provides pytest fixtures and configuration for testing
all components of the learning companion system.
"""

import pytest
import asyncio
from typing import AsyncGenerator, Dict, Any
from httpx import AsyncClient
from fastapi.testclient import TestClient

from main import app
from agents import orchestrator
from config import settings


@pytest.fixture(scope="session")
def event_loop():
    """Create an instance of the default event loop for the test session."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()


@pytest.fixture
def test_client():
    """Create a test client for the FastAPI application."""
    return TestClient(app)


@pytest.fixture
async def async_client() -> AsyncGenerator[AsyncClient, None]:
    """Create an async test client for the FastAPI application."""
    async with AsyncClient(app=app, base_url="http://test") as client:
        yield client


@pytest.fixture
async def initialized_orchestrator():
    """Initialize the agent orchestrator for testing."""
    await orchestrator.initialize()
    yield orchestrator
    await orchestrator.shutdown()


@pytest.fixture
def sample_user_data() -> Dict[str, Any]:
    """Sample user data for testing."""
    return {
        "user_id": "test_user_123",
        "name": "Test User",
        "email": "test@example.com",
        "preferences": {
            "learning_style": "visual",
            "difficulty_preference": "intermediate"
        }
    }


@pytest.fixture
def sample_content_request() -> Dict[str, Any]:
    """Sample content generation request for testing."""
    return {
        "action": "explain",
        "topic": "quadratic equations",
        "difficulty": "intermediate",
        "style": "visual",
        "context": "high school mathematics"
    }


@pytest.fixture
def sample_assessment_request() -> Dict[str, Any]:
    """Sample assessment request for testing."""
    return {
        "action": "evaluate",
        "user_id": "test_user_123",
        "responses": [
            {"question_id": "q1", "answer": "correct_option_a", "correct": True},
            {"question_id": "q2", "answer": "wrong_option_b", "correct": False}
        ],
        "topic": "algebra",
        "context": {"difficulty": "intermediate"}
    }


# Mock data for testing
MOCK_TOPICS = [
    {
        "id": "math_algebra", 
        "name": "Algebra", 
        "difficulty_levels": ["beginner", "intermediate", "advanced"]
    },
    {
        "id": "science_physics", 
        "name": "Physics", 
        "difficulty_levels": ["beginner", "intermediate", "advanced"]
    }
]


class MockAWSService:
    """Mock AWS service for testing without actual AWS connections."""
    
    def __init__(self):
        self.is_initialized = True
    
    async def initialize(self) -> bool:
        return True
    
    def is_healthy(self) -> bool:
        return True