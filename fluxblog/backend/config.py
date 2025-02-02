import os
from datetime import timedelta

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///db.sqlite3")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
    CORS_HEADERS = 'Content-Type'
    
    # Flask-JWT-Extended settings
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-jwt-secret-key")  # Secret key for encoding JWT tokens
    JWT_TOKEN_LOCATION = ['headers']  # JWT token is expected in headers
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=1)  # Optional: Set token expiration (1 day)
    JWT_HEADER_TYPE = "Bearer"