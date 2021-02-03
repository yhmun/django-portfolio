$ docker build --rm -t web:custom .
$ docker build --rm -t nginx:custom nginx

$ docker run -it --rm web:custom /bin/bash

$ docker image prune -a
$ docker images
$ docker rmi <image_id>
$ docker rmi web:custom
$ docker rmi nginx:custom

$ docker ps -a
$ docker rm -f <container_name>

$ docker volume ls
$ docker volume prune

$ docker network ls
$ docker network prune

$ docker system prune -a

$ docker volume inspect postgres_data_prod
$ docker volume inspect postgres_data_dev
$ docker volume inspect static_data
$ docker volume inspect media_data

$ docker-compose pull
$ docker-compose down -v
$ docker-compose down --rmi all
$ docker-compose down --rmi local   
$ docker-compose build
$ docker-compose up -d
$ docker-compose up -d --build
$ docker-compose logs -f
$ docker-compose exec web /bin/bash
$ docker-compose exec web python manage.py createsuperuser
$ docker-compose exec web python manage.py migrate
$ docker-compose exec web python manage.py migrate --noinput
$ docker-compose exec web python manage.py collectstatic --no-input --clear
$ docker-compose exec postgres psql --username=user --dbname=web_dev
$ docker-compose exec postgres psql --username=root --dbname=web_prod
$ docker-compose exec nginx ls /home/app/web

$ docker-compose -f docker-compose.prod.yml down -v
$ docker-compose -f docker-compose.prod.yml build
$ docker-compose -f docker-compose.prod.yml up -d --build
$ docker-compose -f docker-compose.prod.yml exec web python manage.py migrate --noinput
$ docker-compose -f docker-compose.prod.yml exec web python manage.py createsuperuser
$ docker-compose -f docker-compose.prod.yml exec web python manage.py collectstatic --no-input --clear


$ docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/yhmun/OneDrive/Volumes/postgres_data_dev \
    --opt o=bind postgres_data_dev

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/yhmun/OneDrive/Volumes/postgres_data_prod \
    --opt o=bind postgres_data_prod

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/yhmun/OneDrive/Volumes/static_data \
    --opt o=bind static_data

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/Users/yhmun/OneDrive/Volumes/media_data \
    --opt o=bind media_data

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/var/opt/volumes/postgres_data_dev \
    --opt o=bind postgres_data_dev

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/var/opt/volumes/postgres_data_prod \
    --opt o=bind postgres_data_prod

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/var/opt/volumes/static_data \
    --opt o=bind static_data

$ docker volume create --driver local \
    --opt type=none \
    --opt device=/var/opt/volumes/media_data \
    --opt o=bind media_data
