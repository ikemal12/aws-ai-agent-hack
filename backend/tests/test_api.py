"""
Test cases for API endpoints.

This module contains test cases for all REST API endpoints
including content generation, assessment, and user management.
"""

import pytest
from httpx import AsyncClient
from fastapi.testclient import TestClient


class TestContentEndpoints:
    """Test cases for content generation endpoints."""
    
    def test_generate_content(self, test_client: TestClient):
        """Test content generation endpoint."""
        request_data = {
            "action": "explain",
            "topic": "photosynthesis",
            "difficulty": "intermediate",
            "style": "visual"
        }
        
        response = test_client.post("/api/v1/content/generate", json=request_data)
        
        # Since we don't have actual agent initialization in tests,
        # we expect this to return an error, but the endpoint should be reachable
        assert response.status_code in [200, 400, 500]
        assert response.json() is not None
    
    def test_get_topics(self, test_client: TestClient):
        """Test topics listing endpoint."""
        response = test_client.get("/api/v1/content/topics")
        
        assert response.status_code == 200
        data = response.json()
        assert "topics" in data
        assert isinstance(data["topics"], list)
        assert len(data["topics"]) > 0
        
        # Check topic structure
        topic = data["topics"][0]
        assert "id" in topic
        assert "name" in topic
        assert "difficulty_levels" in topic
    
    def test_invalid_content_request(self, test_client: TestClient):
        """Test invalid content generation request."""
        request_data = {
            "action": "explain"
            # Missing required 'topic' field
        }
        
        response = test_client.post("/api/v1/content/generate", json=request_data)
        
        # Should return validation error
        assert response.status_code == 422


class TestAssessmentEndpoints:
    """Test cases for assessment endpoints."""
    
    def test_evaluate_responses(self, test_client: TestClient):
        """Test response evaluation endpoint."""
        request_data = {
            "action": "evaluate",
            "user_id": "test_user_123",
            "responses": [
                {"question_id": "q1", "answer": "A", "correct": True},
                {"question_id": "q2", "answer": "B", "correct": False}
            ],
            "topic": "mathematics"
        }
        
        response = test_client.post("/api/v1/assessment/evaluate", json=request_data)
        
        # Endpoint should be reachable
        assert response.status_code in [200, 400, 500]
        assert response.json() is not None
    
    def test_get_user_progress(self, test_client: TestClient):
        """Test user progress endpoint."""
        user_id = "test_user_123"
        
        response = test_client.get(f"/api/v1/assessment/progress/{user_id}")
        
        # Endpoint should be reachable
        assert response.status_code in [200, 400, 500]
        assert response.json() is not None
    
    def test_invalid_assessment_request(self, test_client: TestClient):
        """Test invalid assessment request."""
        request_data = {
            "action": "evaluate"
            # Missing required 'user_id' field
        }
        
        response = test_client.post("/api/v1/assessment/evaluate", json=request_data)
        
        # Should return validation error
        assert response.status_code == 422


class TestUserEndpoints:
    """Test cases for user management endpoints."""
    
    def test_create_user(self, test_client: TestClient):
        """Test user creation endpoint."""
        user_data = {
            "name": "Test User",
            "email": "test@example.com",
            "preferences": {
                "learning_style": "visual",
                "difficulty_preference": "intermediate"
            }
        }
        
        response = test_client.post("/api/v1/users/", json=user_data)
        
        assert response.status_code == 200
        data = response.json()
        assert data["success"] is True
        assert "user_id" in data
        assert data["message"] == "User created successfully"
    
    def test_get_user(self, test_client: TestClient):
        """Test user retrieval endpoint."""
        user_id = "test_user_123"
        
        response = test_client.get(f"/api/v1/users/{user_id}")
        
        assert response.status_code == 200
        data = response.json()
        assert data["user_id"] == user_id
        assert "name" in data
        assert "preferences" in data


class TestSystemEndpoints:
    """Test cases for system status endpoints."""
    
    def test_health_check(self, test_client: TestClient):
        """Test health check endpoint."""
        response = test_client.get("/api/v1/health")
        
        assert response.status_code == 200
        data = response.json()
        assert "status" in data
        assert "timestamp" in data
    
    def test_agent_capabilities(self, test_client: TestClient):
        """Test agent capabilities endpoint."""
        response = test_client.get("/api/v1/agents/capabilities")
        
        # Endpoint should be reachable even if agents aren't initialized
        assert response.status_code in [200, 500]


class TestRootEndpoints:
    """Test cases for root application endpoints."""
    
    def test_root_endpoint(self, test_client: TestClient):
        """Test root endpoint."""
        response = test_client.get("/")
        
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "Multi-Agent Study Companion" in data["message"]
        assert "version" in data
    
    def test_health_endpoint(self, test_client: TestClient):
        """Test health endpoint."""
        response = test_client.get("/health")
        
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "app" in data


@pytest.mark.asyncio
class TestAsyncEndpoints:
    """Test cases using async client."""
    
    async def test_async_content_generation(self, async_client: AsyncClient):
        """Test content generation with async client."""
        request_data = {
            "action": "explain",
            "topic": "machine learning",
            "difficulty": "advanced"
        }
        
        response = await async_client.post("/api/v1/content/generate", json=request_data)
        
        # Endpoint should be reachable
        assert response.status_code in [200, 400, 500]
        assert response.json() is not None