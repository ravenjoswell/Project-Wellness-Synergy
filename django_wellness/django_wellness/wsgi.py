"""
WSGI config for django_wellness project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

settings_module = 'django_wellness.deployment_settings' if 'postgresql://wellness_synergy_postgres_chvb_user:TJNPbY9EofMasyZ4tHLthaRRg83ZYD9p@dpg-cuh85pjv2p9s73csiapg-a/wellness_synergy_postgres_chvb' in os.environ else 'django_wellness.settings'
os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)

application = get_wsgi_application()
