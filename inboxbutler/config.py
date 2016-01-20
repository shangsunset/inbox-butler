import os
from datetime import timedelta


class Config():
    DEBUG = False
    SECRET_KEY = os.environ.get('SECRET_KEY')
    PERMANENT_SESSION_LIFETIME = 360 * 24
    API_KEY = os.environ.get('API_KEY')
    GOOGLE_ID = os.environ.get('GOOGLE_ID')
    GOOGLE_SECRET = os.environ.get('GOOGLE_SECRET')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379')


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False
