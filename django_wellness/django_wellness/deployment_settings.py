import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR
from dotenv import load_dotenv

ALLOWED_HOSTS = [os.environ.get('postgresql://wellness_synergy_postgres_chvb_user:TJNPbY9EofMasyZ4tHLthaRRg83ZYD9p@dpg-cuh85pjv2p9s73csiapg-a/wellness_synergy_postgres_chvb')]
CSRF_TRUSTED_ORIGINS = ['https://'+os.environ.get('postgresql://wellness_synergy_postgres_chvb_user:TJNPbY9EofMasyZ4tHLthaRRg83ZYD9p@dpg-cuh85pjv2p9s73csiapg-a/wellness_synergy_postgres_chvb')]


DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', 
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS_ALLOWED_ORIGINS = [
#     'http://localhost:5173'
# ]

STORAGES = {
    "default":{
        "BACKEND" : "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND" : "whitenoise.storage.CompressedStaticFilesStorage"
    }
}

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ['DATABASE_URL'],
        conn_max_age=600,
    )}

# DATABASES = {
#     'default': dj_database_url.parse(os.environ.get('DATABASE_URL'))
# }

AUTH_USER_MODEL = 'user_app.User'


load_dotenv()
EDAMAM_APP_ID = os.getenv('EDAMAM_APP_ID')
EDAMAM_APP_KEY = os.getenv('EDAMAM_APP_KEY')
OPENAI_APP_KEY = os.getenv('OPENAI_APP_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')
DATABASE_URL = os.getenv('DATABASE_URL')