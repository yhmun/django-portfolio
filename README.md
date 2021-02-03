# django-portfolio-2
Portfolio Website powered by Dockerizing Django with Postgres, Gunicorn, and Nginx


## Copy and edit environmental files for production
```
$ cp .env.dev .env.prod
$ cp .env.dev.postgres .env.prod.postgres
```

## Build and run docker containers
```
$ docker-compose up -d --build
$ docker-compose -f docker-compose.prod.yml up -d --build
```

## Database migration
```
$ vi entrypoint.sh
python manage.py flush --no-input
python manage.py migrate
```
or
```
$ docker-compose exec web python manage.py flush --no-input
$ docker-compose exec web python manage.py migrate
```