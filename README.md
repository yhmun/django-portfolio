## Portflio Web Application
This purposes for practising building a web applicaiton on cloud.

## Prerequisite 
- Ubuntu 18.04 LTS (option)
- Docker CE
- Docker-Compose

## Getting Started
- Download source codes
```
$ git clone https://github.com/mcodegeeks/django-portfolio.git
```
- Create environmental files
```
$ vi .env.postgres
POSTGRES_USER=<postgres>
POSTGRES_PASSWORD=<password>
POSTGRES_DB=<portfolio>
```
```
$ vi .env
SECRET_KEY=<encripted password>
DJANGO_ALLOWED_HOSTS=<domain name> localhost 127.0.0.1 [::1]
DATABASE_URL=postgresql://<postgres>:<password>@postgres:5432/<portfolio>
TIME_ZONE=<America/Toronto>
DEBUG=False
```
- Launch servers
```
$ docker-compose up -d
```
- Create admin user
```
$ docker-compose exec web python manage.py createsuperuser
```
- Migrate database
```
$ docker-compose exec web python manage.py migrate
```
- Explore on your web browser
  * http://example.com
  * http://example.com/admin

## Getting Started for standalone development
- Create environmental file
```
$ vi portfolio/.env
SECRET_KEY=<encripted password>
DJANGO_ALLOWED_HOSTS=localhost 127.0.0.1 [::1]
DATABASE_URL=postgresql://<postgres>:<password>@localhost:54320/<portfolio>   # Port: 54320
TIME_ZONE=<America/Toronto>
DEBUG=True
```
- Launch postgres server only
```
$ docker-compose up postgres
```
- Have fun with developement
```
$ python3 -m venv venv
$ source venv/bin/activate
(venv) $ pip install --upgrade pip
(venv) $ pip install -r requirements.txt
(venv) $ ./manage.py createsuperuser
(venv) $ ./manage.py migrate
(venv) $ .manage.py runserver 0:8000
```
- Explore on your web browser
  * http://localhost:8000
