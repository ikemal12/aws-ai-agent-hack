# API Reference

## Multi-Agent Study Companion API

Base URL: `http://localhost:8000/api/v1`

### Authentication
Currently using basic API key authentication. JWT tokens will be implemented in future versions.

## Content Generation Endpoints

### Generate Content
Generate educational content using AI agents.

**Endpoint:** `POST /content/generate`

**Request Body:**
```json
{
  "action": "explain|quiz|summary",
  "topic": "string",
  "difficulty": "beginner|intermediate|advanced",
  "style": "string",
  "context": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "content": "Generated content...",
    "topic": "string",
    "difficulty": "string"
  },
  "message": "Content generated successfully"
}
```

### Get Topics
Retrieve list of available learning topics.

**Endpoint:** `GET /content/topics`

**Response:**
```json
{
  "topics": [
    {
      "id": "math_algebra",
      "name": "Algebra",
      "difficulty_levels": ["beginner", "intermediate", "advanced"]
    }
  ]
}
```

## Assessment Endpoints

### Evaluate Responses
Evaluate user responses and provide feedback.

**Endpoint:** `POST /assessment/evaluate`

**Request Body:**
```json
{
  "action": "evaluate",
  "user_id": "string",
  "responses": [
    {
      "question_id": "string",
      "answer": "string",
      "correct": boolean
    }
  ],
  "topic": "string",
  "context": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "score": 0.85,
    "correct_count": 4,
    "total_count": 5,
    "feedback": "Good understanding demonstrated.",
    "areas_for_improvement": ["Complex problem solving"],
    "strengths": ["Basic concepts"]
  }
}
```

### Get User Progress
Retrieve comprehensive learning progress for a user.

**Endpoint:** `GET /assessment/progress/{user_id}`

**Response:**
```json
{
  "success": true,
  "data": {
    "user_id": "string",
    "overall_progress": 0.65,
    "recent_improvement": 0.12,
    "learning_velocity": "moderate",
    "mastered_topics": ["Basic Concepts"],
    "in_progress_topics": ["Intermediate Topics"],
    "recommended_topics": ["Advanced Applications"]
  }
}
```

## User Management Endpoints

### Create User
Create a new user profile.

**Endpoint:** `POST /users/`

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "preferences": {
    "learning_style": "visual|auditory|kinesthetic",
    "difficulty_preference": "beginner|intermediate|advanced"
  }
}
```

### Get User
Retrieve user profile and preferences.

**Endpoint:** `GET /users/{user_id}`

**Response:**
```json
{
  "user_id": "string",
  "name": "string",
  "preferences": {
    "learning_style": "visual",
    "difficulty_preference": "intermediate"
  },
  "created_at": "2024-01-01T00:00:00Z"
}
```

## System Endpoints

### Health Check
Check system health and agent status.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "agents": {
    "orchestrator_initialized": true,
    "agents": {
      "content_generator": {
        "name": "Content Generator",
        "healthy": true,
        "capabilities": ["explain_topic", "generate_quiz"]
      }
    }
  }
}
```

### Get Agent Capabilities
List all available agent capabilities.

**Endpoint:** `GET /agents/capabilities`

**Response:**
```json
{
  "capabilities": {
    "content_generator": ["explain_topic", "generate_quiz", "create_summary"],
    "assessment": ["evaluate_responses", "track_progress", "generate_recommendations"]
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "success": false,
  "message": "Error description",
  "error_code": "ERROR_CODE",
  "details": {}
}
```

### HTTP Status Codes
- `200` - Success
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

## Rate Limiting
API endpoints are rate-limited to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per authenticated user

## Versioning
The API uses URL versioning (`/api/v1/`). Breaking changes will result in a new version number.