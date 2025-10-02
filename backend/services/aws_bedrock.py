"""
AWS Bedrock service integration for AI content generation.

This module provides a service layer for interacting with AWS Bedrock
to generate educational content using foundation models.
"""

import json
from typing import Any, Dict, Optional
import boto3
from botocore.exceptions import ClientError
from loguru import logger

from config import settings


class BedrockService:
    """
    Service for interacting with AWS Bedrock foundation models.
    
    Provides methods for content generation, text analysis, and
    other AI-powered educational features.
    """
    
    def __init__(self):
        self.client = None
        self.runtime_client = None
        self.model_id = settings.bedrock_model_id
        self.is_initialized = False
    
    async def initialize(self) -> bool:
        """Initialize Bedrock client connections."""
        try:
            # Initialize Bedrock clients
            session = boto3.Session(
                aws_access_key_id=settings.aws_access_key_id,
                aws_secret_access_key=settings.aws_secret_access_key,
                region_name=settings.aws_region
            )
            
            self.client = session.client('bedrock')
            self.runtime_client = session.client('bedrock-runtime')
            
            # Test connection
            await self._test_connection()
            
            self.is_initialized = True
            logger.info("Bedrock service initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize Bedrock service: {e}")
            return False
    
    async def _test_connection(self):
        """Test Bedrock connection."""
        try:
            # List available models to test connection
            response = self.client.list_foundation_models()
            logger.info(f"Connected to Bedrock. Available models: {len(response.get('modelSummaries', []))}")
        except ClientError as e:
            logger.warning(f"Bedrock connection test failed: {e}")
            # Continue anyway - might work in actual usage
    
    async def generate_content(
        self, 
        prompt: str, 
        max_tokens: int = 1000,
        temperature: float = 0.7
    ) -> Optional[str]:
        """
        Generate content using Bedrock foundation model.
        
        Args:
            prompt: Input prompt for content generation
            max_tokens: Maximum tokens to generate
            temperature: Creativity/randomness level (0.0 to 1.0)
            
        Returns:
            str: Generated content or None if failed
        """
        if not self.is_initialized:
            logger.error("Bedrock service not initialized")
            return None
        
        try:
            # Prepare request based on model type
            if "claude" in self.model_id.lower():
                body = {
                    "prompt": f"\n\nHuman: {prompt}\n\nAssistant:",
                    "max_tokens_to_sample": max_tokens,
                    "temperature": temperature,
                    "top_p": 0.9,
                }
            else:
                # Generic format for other models
                body = {
                    "inputText": prompt,
                    "textGenerationConfig": {
                        "maxTokenCount": max_tokens,
                        "temperature": temperature,
                        "topP": 0.9
                    }
                }
            
            response = self.runtime_client.invoke_model(
                modelId=self.model_id,
                contentType="application/json",
                accept="application/json",
                body=json.dumps(body)
            )
            
            response_body = json.loads(response.get('body').read())
            
            # Extract content based on model response format
            if "claude" in self.model_id.lower():
                content = response_body.get('completion', '')
            else:
                # Handle other model formats
                results = response_body.get('results', [])
                content = results[0].get('outputText', '') if results else ''
            
            return content.strip()
            
        except Exception as e:
            logger.error(f"Error generating content with Bedrock: {e}")
            return None
    
    async def analyze_text(self, text: str, analysis_type: str = "sentiment") -> Optional[Dict[str, Any]]:
        """
        Analyze text using Bedrock models.
        
        Args:
            text: Text to analyze
            analysis_type: Type of analysis (sentiment, complexity, etc.)
            
        Returns:
            Dict: Analysis results or None if failed
        """
        if analysis_type == "sentiment":
            prompt = f"Analyze the sentiment of this text and provide a score from -1 (negative) to 1 (positive): {text}"
        elif analysis_type == "complexity":
            prompt = f"Rate the complexity of this educational content from 1 (beginner) to 10 (expert): {text}"
        else:
            prompt = f"Analyze this text for {analysis_type}: {text}"
        
        result = await self.generate_content(prompt, max_tokens=200, temperature=0.3)
        
        if result:
            return {
                "analysis_type": analysis_type,
                "result": result,
                "original_text": text[:100] + "..." if len(text) > 100 else text
            }
        
        return None
    
    def is_healthy(self) -> bool:
        """Check if the service is healthy."""
        return self.is_initialized and self.runtime_client is not None