"""
AWS S3 service integration for file storage.

This module provides a service layer for interacting with AWS S3
to store and retrieve learning content, user uploads, and media files.
"""

import json
from typing import Any, Dict, List, Optional
import boto3
from botocore.exceptions import ClientError
from loguru import logger

from config import settings


class S3Service:
    """
    Service for interacting with AWS S3 for file storage.
    
    Manages storage and retrieval of learning content, user uploads,
    media files, and document processing.
    """
    
    def __init__(self):
        self.client = None
        self.bucket_name = settings.s3_bucket_name
        self.is_initialized = False
    
    async def initialize(self) -> bool:
        """Initialize S3 client connection."""
        try:
            # Initialize S3 client
            session = boto3.Session(
                aws_access_key_id=settings.aws_access_key_id,
                aws_secret_access_key=settings.aws_secret_access_key,
                region_name=settings.aws_region
            )
            
            self.client = session.client('s3')
            
            # Test connection
            await self._test_connection()
            
            self.is_initialized = True
            logger.info("S3 service initialized successfully")
            return True
            
        except Exception as e:
            logger.error(f"Failed to initialize S3 service: {e}")
            return False
    
    async def _test_connection(self):
        """Test S3 connection."""
        try:
            # Check if bucket exists
            self.client.head_bucket(Bucket=self.bucket_name)
            logger.info(f"Connected to S3 bucket: {self.bucket_name}")
        except ClientError as e:
            error_code = int(e.response['Error']['Code'])
            if error_code == 404:
                logger.warning(f"S3 bucket {self.bucket_name} does not exist")
            else:
                logger.warning(f"S3 connection test failed: {e}")
    
    async def upload_content(
        self, 
        content: bytes, 
        key: str, 
        content_type: str = "application/octet-stream",
        metadata: Optional[Dict[str, str]] = None
    ) -> bool:
        """
        Upload content to S3.
        
        Args:
            content: Binary content to upload
            key: S3 object key (file path)
            content_type: MIME type of the content
            metadata: Optional metadata to attach
            
        Returns:
            bool: True if successful, False otherwise
        """
        try:
            # Add content prefix
            full_key = f"{settings.s3_content_prefix}{key}"
            
            extra_args = {
                'ContentType': content_type
            }
            
            if metadata:
                extra_args['Metadata'] = metadata
            
            self.client.put_object(
                Bucket=self.bucket_name,
                Key=full_key,
                Body=content,
                **extra_args
            )
            
            logger.info(f"Uploaded content to S3: {full_key}")
            return True
            
        except Exception as e:
            logger.error(f"Error uploading to S3: {e}")
            return False
    
    async def download_content(self, key: str) -> Optional[bytes]:
        """
        Download content from S3.
        
        Args:
            key: S3 object key (file path)
            
        Returns:
            bytes: Content data or None if failed
        """
        try:
            # Add content prefix
            full_key = f"{settings.s3_content_prefix}{key}"
            
            response = self.client.get_object(
                Bucket=self.bucket_name,
                Key=full_key
            )
            
            content = response['Body'].read()
            logger.info(f"Downloaded content from S3: {full_key}")
            return content
            
        except Exception as e:
            logger.error(f"Error downloading from S3: {e}")
            return None
    
    async def upload_user_file(
        self, 
        user_id: str, 
        file_name: str, 
        content: bytes,
        content_type: str = "application/octet-stream"
    ) -> Optional[str]:
        """
        Upload user file to S3.
        
        Args:
            user_id: User identifier
            file_name: Original file name
            content: File content
            content_type: MIME type
            
        Returns:
            str: S3 key of uploaded file or None if failed
        """
        try:
            # Create user-specific key
            key = f"{settings.s3_user_data_prefix}{user_id}/{file_name}"
            
            self.client.put_object(
                Bucket=self.bucket_name,
                Key=key,
                Body=content,
                ContentType=content_type,
                Metadata={
                    'user_id': user_id,
                    'original_name': file_name,
                    'upload_time': '2024-01-01T00:00:00Z'
                }
            )
            
            logger.info(f"Uploaded user file: {key}")
            return key
            
        except Exception as e:
            logger.error(f"Error uploading user file: {e}")
            return None
    
    async def list_user_files(self, user_id: str) -> List[Dict[str, Any]]:
        """
        List files for a specific user.
        
        Args:
            user_id: User identifier
            
        Returns:
            List: List of file information
        """
        try:
            prefix = f"{settings.s3_user_data_prefix}{user_id}/"
            
            response = self.client.list_objects_v2(
                Bucket=self.bucket_name,
                Prefix=prefix
            )
            
            files = []
            for obj in response.get('Contents', []):
                files.append({
                    'key': obj['Key'],
                    'size': obj['Size'],
                    'last_modified': obj['LastModified'].isoformat(),
                    'file_name': obj['Key'].split('/')[-1]
                })
            
            return files
            
        except Exception as e:
            logger.error(f"Error listing user files: {e}")
            return []
    
    async def generate_presigned_url(
        self, 
        key: str, 
        expiration: int = 3600,
        http_method: str = 'GET'
    ) -> Optional[str]:
        """
        Generate presigned URL for S3 object access.
        
        Args:
            key: S3 object key
            expiration: URL expiration time in seconds
            http_method: HTTP method (GET, PUT, etc.)
            
        Returns:
            str: Presigned URL or None if failed
        """
        try:
            url = self.client.generate_presigned_url(
                http_method.lower() + '_object',
                Params={'Bucket': self.bucket_name, 'Key': key},
                ExpiresIn=expiration
            )
            
            return url
            
        except Exception as e:
            logger.error(f"Error generating presigned URL: {e}")
            return None
    
    def is_healthy(self) -> bool:
        """Check if the service is healthy."""
        return self.is_initialized and self.client is not None