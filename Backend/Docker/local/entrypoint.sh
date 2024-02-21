set -e

python manage.py loaddata core_apps/chat/fixtures/seed_data.json

exec "$@"