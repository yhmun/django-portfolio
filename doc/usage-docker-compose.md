### Build
```
$ docker-compose build                  # Build or rebuild services.
```

### Pull
```
$ docker-compose pull                   # Pulls images for services defined in a Compose file, but does not start the containers.
```

### Execute
```
$ docker-compose exec                   # Execute a command in a running container
$ docker-compose exec portfolio /bin/bash
$ docker-compose exec portfolio ./manage.py createsuperuser
$ docker-compose exec portfolio ./manage.py migrate
$ docker-compose exec postgres psql --username='postgres' --dbname='portfolio'
$ docker-compose exec nginx ls /var/www
```

### Service
```
$ docker-compose up -d                  # Builds, (re)creates, starts, and attaches to containers for a service.
$ docker-compose up --build
$ docker-compose up --no-build
$ docker-compose up --no-start
$ docker-compose up -d postgres
$ docker-compose up portfolio
$ docker-compose up -d
```
```
$ docker-compose down                   # Stops containers and removes containers, networks, volumes, and images created by `up`.
$ docker-compose down --rmi all
$ docker-compose down --rmi local
$ docker-compose down --rmi all
```
```
$ docker-compose stop                   # Stop running containers without removing them.
$ docker-compose stop portfolio
```