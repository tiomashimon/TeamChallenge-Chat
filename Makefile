build:
	docker compose -f docker-compose.yml up --build -d --remove-orphans

up:
	docker compose -f docker-compose.yml up 

down:
	docker compose -f docker-compose.yml down

makemigrations:
	docker compose -f docker-compose.yml run --rm api python manage.py makemigrations

migrate:
	docker compose -f docker-compose.yml run --rm api python manage.py migrate

superuser:
	docker compose -f  docker-compose.yml run --rm api python manage.py createsuperuser