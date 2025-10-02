"""
API routes for the Multi-Agent Study Companion.

This module defines all API endpoints and routes for the application,
including user management, content generation, and assessment endpoints.
"""

from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Dict, List
from pydantic import BaseModel
from loguru import logger

from agents import orchestrator, AgentResponse

# Create API router
router = APIRouter()


# Request/Response models
class ContentRequest(BaseModel):
    """Request model for content generation."""
    action: str
    topic: str
    difficulty: str = "intermediate"
    style: str = "default"
    context: str = ""


class AssessmentRequest(BaseModel):
    """Request model for learning assessment."""
    action: str
    user_id: str
    responses: List[Dict[str, Any]] = []
    topic: str = ""
    context: Dict[str, Any] = {}


class UserProgressResponse(BaseModel):
    """Response model for user progress."""
    user_id: str
    overall_progress: float
    recent_sessions: List[Dict[str, Any]]
    recommendations: List[str]


# Content Generation Endpoints
@router.post("/content/generate", response_model=Dict[str, Any])
async def generate_content(request: ContentRequest):
    """
    Generate educational content using AI agents.
    
    Supports different types of content generation including explanations,
    quizzes, summaries, and personalized learning materials.
    """
    try:
        # Convert request to agent format
        agent_request = {
            "agent": "content_generator",
            "action": request.action,
            "topic": request.topic,
            "difficulty": request.difficulty,
            "style": request.style,
            "context": request.context
        }
        
        # Process through orchestrator
        response = await orchestrator.process_request(agent_request)
        
        if not response.success:
            raise HTTPException(status_code=400, detail=response.message)
        
        return {
            "success": True,
            "data": response.data,
            "message": response.message
        }
        
    except Exception as e:
        logger.error(f"Error in content generation: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/content/topics")
async def get_available_topics():
    """Get list of available learning topics."""
    # Mock data - replace with actual topic management
    topics = [
        {"id": "math_algebra", "name": "Algebra", "difficulty_levels": ["beginner", "intermediate", "advanced"]},
        {"id": "science_physics", "name": "Physics", "difficulty_levels": ["beginner", "intermediate", "advanced"]},
        {"id": "programming_python", "name": "Python Programming", "difficulty_levels": ["beginner", "intermediate", "advanced"]},
        {"id": "history_worldwar", "name": "World War History", "difficulty_levels": ["intermediate", "advanced"]},
    ]
    
    return {"topics": topics}


# Assessment Endpoints
@router.post("/assessment/evaluate", response_model=Dict[str, Any])
async def evaluate_responses(request: AssessmentRequest):
    """
    Evaluate user responses and provide feedback.
    
    Analyzes user answers to questions or exercises and provides
    detailed feedback, scoring, and improvement suggestions.
    """
    try:
        # Convert request to agent format
        agent_request = {
            "agent": "assessment",
            "action": request.action,
            "user_id": request.user_id,
            "responses": request.responses,
            "topic": request.topic,
            "context": request.context
        }
        
        # Process through orchestrator
        response = await orchestrator.process_request(agent_request)
        
        if not response.success:
            raise HTTPException(status_code=400, detail=response.message)
        
        return {
            "success": True,
            "data": response.data,
            "message": response.message
        }
        
    except Exception as e:
        logger.error(f"Error in assessment: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/assessment/progress/{user_id}", response_model=Dict[str, Any])
async def get_user_progress(user_id: str):
    """Get comprehensive learning progress for a user."""
    try:
        agent_request = {
            "agent": "assessment",
            "action": "progress",
            "user_id": user_id
        }
        
        response = await orchestrator.process_request(agent_request)
        
        if not response.success:
            raise HTTPException(status_code=400, detail=response.message)
        
        return {
            "success": True,
            "data": response.data,
            "message": response.message
        }
        
    except Exception as e:
        logger.error(f"Error getting user progress: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# User Management Endpoints
@router.post("/users/", response_model=Dict[str, Any])
async def create_user(user_data: Dict[str, Any]):
    """Create a new user profile."""
    # TODO: Implement user creation with DynamoDB
    return {
        "success": True,
        "user_id": user_data.get("email", "user123"),
        "message": "User created successfully"
    }


@router.get("/users/{user_id}", response_model=Dict[str, Any])
async def get_user(user_id: str):
    """Get user profile and preferences."""
    # TODO: Implement user retrieval from DynamoDB
    return {
        "user_id": user_id,
        "name": "Sample User",
        "preferences": {
            "learning_style": "visual",
            "difficulty_preference": "intermediate"
        },
        "created_at": "2024-01-01T00:00:00Z"
    }


# System Status Endpoints
@router.get("/health")
async def health_check():
    """Check system health and agent status."""
    try:
        status = await orchestrator.get_system_status()
        return {
            "status": "healthy",
            "timestamp": "2024-01-01T00:00:00Z",
            "agents": status
        }
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {
            "status": "unhealthy",
            "error": str(e),
            "timestamp": "2024-01-01T00:00:00Z"
        }


@router.get("/agents/capabilities")
async def get_agent_capabilities():
    """Get list of all agent capabilities."""
    try:
        status = await orchestrator.get_system_status()
        capabilities = {}
        
        for agent_name, agent_info in status.get("agents", {}).items():
            capabilities[agent_name] = agent_info.get("capabilities", [])
        
        return {"capabilities": capabilities}
        
    except Exception as e:
        logger.error(f"Error getting capabilities: {e}")
        raise HTTPException(status_code=500, detail=str(e))