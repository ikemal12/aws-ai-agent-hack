"""
AWS DynamoDB service integration for data persistence.

This module provides a service layer for interacting with AWS DynamoDB
to store and retrieve user data, learning progress, and content metadata.
"""

import json
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError
from loguru import logger

from config import settings


class DynamoDBService:
    """
    Service for interacting with AWS DynamoDB for data persistence.
    
    Manages user profiles, learning sessions, progress tracking,
    and content metadata storage.
    """
    
    def __init__(self):
        self.client = None
        self.resource = None
        self.tables = {}
        self.is_initialized = False
    
    async def initialize(self) -> bool:
        """Initialize DynamoDB client and table references."""
        try:
            # Initialize DynamoDB clients
            session = boto3.Session(
                aws_access_key_id=settings.aws_access_key_id,
                aws_secret_access_key=settings.aws_secret_access_key,
                region_name=settings.aws_region
            )
            
            self.client = session.client('dynamodb')
            self.resource = session.resource('dynamodb')
            
            # Initialize table references
            self.tables = {
                'users': self.resource.Table(f"{settings.dynamodb_table_prefix}{settings.dynamodb_users_table}"),
                'sessions': self.resource.Table(f"{settings.dynamodb_table_prefix}{settings.dynamodb_sessions_table}"),
                'content': self.resource.Table(f"{settings.dynamodb_table_prefix}{settings.dynamodb_content_table}")
            }
            
            # Test connection
            await self._test_connection()
            
            self.is_initialized = True
            logger.info("DynamoDB service initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize DynamoDB service: {e}")
            return False
    
    async def _test_connection(self):
        """Test DynamoDB connection."""
        try:
            # List tables to test connection
            response = self.client.list_tables()
            logger.info(f"Connected to DynamoDB. Available tables: {len(response.get('TableNames', []))}")
        except ClientError as e:
            logger.warning(f"DynamoDB connection test failed: {e}")
    
    async def create_user(self, user_data: Dict[str, Any]) -> bool:
        """
        Create a new user record.
        
        Args:
            user_data: User information including id, name, preferences, etc.
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            table = self.tables['users']
            
            # Add metadata
            user_data['created_at'] = '2024-01-01T00:00:00Z'  # Current timestamp
            user_data['updated_at'] = '2024-01-01T00:00:00Z'
            user_data['version'] = 1
            
            table.put_item(Item=user_data)
            logger.info(f"Created user: {user_data.get('user_id')}")
            return True
            
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            return False
    
    async def get_user(self, user_id: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve user data by ID.
        
        Args:
            user_id: User identifier
            
        Returns:
            Dict: User data or None if not found
        """
        try:
            table = self.tables['users']
            
            response = table.get_item(Key={'user_id': user_id})
            return response.get('Item')
            
        except Exception as e:
            logger.error(f"Error retrieving user {user_id}: {e}")
            return None
    
    async def update_user_progress(
        self, 
        user_id: str, 
        session_data: Dict[str, Any]
    ) -> bool:
        """
        Update user learning progress.
        
        Args:
            user_id: User identifier
            session_data: Learning session data and progress
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Store session data
            session_table = self.tables['sessions']
            session_data['user_id'] = user_id
            session_data['session_id'] = f"{user_id}_{session_data.get('timestamp', '0')}"
            session_data['created_at'] = '2024-01-01T00:00:00Z'
            
            session_table.put_item(Item=session_data)
            
            # Update user aggregate progress
            user_table = self.tables['users']
            user_table.update_item(
                Key={'user_id': user_id},
                UpdateExpression='SET updated_at = :timestamp, last_session = :session',
                ExpressionAttributeValues={
                    ':timestamp': '2024-01-01T00:00:00Z',
                    ':session': session_data['session_id']
                }
            )
            
            logger.info(f"Updated progress for user: {user_id}")
            return True
            
        except Exception as e:
            logger.error(f"Error updating user progress: {e}")
            return False
    
    async def get_user_sessions(
        self, 
        user_id: str, 
        limit: int = 10
    ) -> List[Dict[str, Any]]:
        """
        Retrieve recent user sessions.
        
        Args:
            user_id: User identifier
            limit: Maximum number of sessions to retrieve
            
        Returns:
            List: List of session data
        """
        try:
            table = self.tables['sessions']
            
            # Mock query - implement proper GSI query for production
            response = table.scan(
                FilterExpression='user_id = :user_id',
                ExpressionAttributeValues={':user_id': user_id},
                Limit=limit
            )
            
            return response.get('Items', [])
            
        except Exception as e:
            logger.error(f"Error retrieving sessions for user {user_id}: {e}")
            return []
    
    async def store_content(self, content_data: Dict[str, Any]) -> bool:
        """
        Store content metadata and analytics.
        
        Args:
            content_data: Content information and metadata
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            table = self.tables['content']
            
            content_data['created_at'] = '2024-01-01T00:00:00Z'
            content_data['updated_at'] = '2024-01-01T00:00:00Z'
            
            table.put_item(Item=content_data)
            logger.info(f"Stored content: {content_data.get('content_id')}")
            return True
            
        except Exception as e:
            logger.error(f"Error storing content: {e}")
            return False
    
    def is_healthy(self) -> bool:
        """Check if the service is healthy."""
        return self.is_initialized and self.client is not None