"""
AWS Lambda function for content generation.

This function can be deployed as a serverless alternative to the main backend
for handling content generation requests using AWS Bedrock.
"""

import json
import os
import boto3
from typing import Any, Dict, Optional

# Initialize Bedrock client
bedrock_runtime = boto3.client('bedrock-runtime', region_name=os.getenv('AWS_REGION', 'us-east-1'))


def lambda_handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for content generation requests.
    
    Args:
        event: API Gateway event containing the request
        context: Lambda context object
    
    Returns:
        Dict: API Gateway response
    """
    try:
        # Parse request body
        if 'body' in event:
            body = json.loads(event['body']) if isinstance(event['body'], str) else event['body']
        else:
            body = event
        
        action = body.get('action', 'explain')
        topic = body.get('topic', '')
        difficulty = body.get('difficulty', 'intermediate')
        
        if not topic:
            return create_error_response(400, "Topic is required")
        
        # Generate content based on action
        if action == 'explain':
            content = generate_explanation(topic, difficulty)
        elif action == 'quiz':
            content = generate_quiz(topic, difficulty)
        elif action == 'summary':
            content = generate_summary(topic)
        else:
            return create_error_response(400, f"Unknown action: {action}")
        
        # Return success response
        return create_success_response({
            'content': content,
            'topic': topic,
            'difficulty': difficulty,
            'action': action
        })
        
    except Exception as e:
        print(f"Error in lambda_handler: {str(e)}")
        return create_error_response(500, "Internal server error")


def generate_explanation(topic: str, difficulty: str) -> str:
    """Generate an explanation for a topic using Bedrock."""
    prompt = f"""
    Create a clear, engaging explanation of {topic} suitable for a {difficulty} level learner.
    Use examples and analogies where appropriate. Structure the explanation logically.
    Keep the explanation concise but comprehensive.
    """
    
    return invoke_bedrock_model(prompt)


def generate_quiz(topic: str, difficulty: str) -> Dict[str, Any]:
    """Generate a quiz for a topic using Bedrock."""
    prompt = f"""
    Create a quiz about {topic} with 5 multiple choice questions suitable for {difficulty} level.
    Format as JSON with questions, options, and correct answers.
    Include explanations for correct answers.
    """
    
    content = invoke_bedrock_model(prompt)
    
    # In a real implementation, you'd parse the JSON response
    return {
        "quiz_content": content,
        "topic": topic,
        "difficulty": difficulty,
        "question_count": 5
    }


def generate_summary(topic: str) -> str:
    """Generate a summary for a topic using Bedrock."""
    prompt = f"""
    Create a concise summary of the key points about {topic}.
    Highlight the most important concepts and their relationships.
    Keep it focused and easy to understand.
    """
    
    return invoke_bedrock_model(prompt)


def invoke_bedrock_model(prompt: str) -> str:
    """
    Invoke AWS Bedrock model with the given prompt.
    
    Args:
        prompt: Input prompt for the model
    
    Returns:
        str: Generated content
    """
    try:
        model_id = os.getenv('BEDROCK_MODEL_ID', 'anthropic.claude-v2')
        
        # Prepare request body based on model
        if 'claude' in model_id.lower():
            body = {
                "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                "max_tokens_to_sample": 1000,
                "temperature": 0.7,
                "top_p": 0.9,
            }
        else:
            # Generic format for other models
            body = {
                "inputText": prompt,
                "textGenerationConfig": {
                    "maxTokenCount": 1000,
                    "temperature": 0.7,
                    "topP": 0.9
                }
            }
        
        response = bedrock_runtime.invoke_model(
            modelId=model_id,
            contentType="application/json",
            accept="application/json",
            body=json.dumps(body)
        )
        
        response_body = json.loads(response.get('body').read())
        
        # Extract content based on model response format
        if 'claude' in model_id.lower():
            content = response_body.get('completion', '')
        else:
            results = response_body.get('results', [])
            content = results[0].get('outputText', '') if results else ''
        
        return content.strip()
        
    except Exception as e:
        print(f"Error invoking Bedrock model: {str(e)}")
        return f"Error generating content for the topic. Please try again."


def create_success_response(data: Dict[str, Any]) -> Dict[str, Any]:
    """Create a successful API Gateway response."""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        'body': json.dumps({
            'success': True,
            'data': data,
            'message': 'Content generated successfully'
        })
    }


def create_error_response(status_code: int, message: str) -> Dict[str, Any]:
    """Create an error API Gateway response."""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
        },
        'body': json.dumps({
            'success': False,
            'message': message
        })
    }