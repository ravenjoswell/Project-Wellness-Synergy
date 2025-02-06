#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    settings_module = 'django_wellness.deployment_settings' if 'postgresql://wellness_synergy_postgres_chvb_user:TJNPbY9EofMasyZ4tHLthaRRg83ZYD9p@dpg-cuh85pjv2p9s73csiapg-a/wellness_synergy_postgres_chvb' in os.environ else 'django_wellness.settings'
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', settings_module)
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
