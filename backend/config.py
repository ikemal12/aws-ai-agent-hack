"""
Configuration settings for the Multi-Agent Study Companion backend.

This module contains all configuration settings including AWS credentials,
database connections, and application settings.
"""

import os
from typing import Optional
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    # Application Settings
    app_name: str = "Multi-Agent Study Companion"
    app_version: str = "1.0.0"
    debug: bool = False
    
    # Server Settings
    host: str = "0.0.0.0"
    port: int = 8000
    
    # Security
    secret_key: str = "your-secret-key-here"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30
    
    # AWS Settings
    aws_region: str = "us-east-1"
    aws_access_key_id: Optional[str] = None
    aws_secret_access_key: Optional[str] = None
    
    # AWS Bedrock Settings
    bedrock_model_id: str = "anthropic.claude-v2"
    bedrock_endpoint_url: Optional[str] = None
    
    # AWS SageMaker Settings
    sagemaker_endpoint_name: Optional[str] = None
    sagemaker_model_name: Optional[str] = None
    
    # DynamoDB Settings
    dynamodb_table_prefix: str = "study_companion_"
    dynamodb_users_table: str = "users"
    dynamodb_sessions_table: str = "sessions"
    dynamodb_content_table: str = "content"
    
    # S3 Settings
    s3_bucket_name: str = "study-companion-storage"
    s3_content_prefix: str = "content/"
    s3_user_data_prefix: str = "user_data/"
    
    # Database Settings (if using PostgreSQL as primary DB)
    database_url: Optional[str] = None
    
    # Logging
    log_level: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = False


# Global settings instance
settings = Settings()


def get_settings() -> Settings:
    """Get application settings."""
    return settings