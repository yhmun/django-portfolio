## django commands
$ django-admin startproject web .
$ mkdir -p apps/main && \
    django-admin startapp main apps/main
$ python manage.py runserver
$ python manage.py createsuperuser

### app
$ mkdir -p apps/example/file_upload && \
    django-admin startapp file_upload apps/example/file_upload
$ mkdir -p apps/example/adoptions && \
    django-admin startapp adoptions apps/example/adoptions
$ mkdir -p apps/example/jobs && \
    django-admin startapp jobs apps/example/jobs

### migrations
$ python manage.py makemigrations <app>
$ python manage.py makemigrations adoptions
$ python manage.py makemigrations jobs

$ python manage.py sqlmigrate <app> 0001
$ python manage.py migrate
$ python manage.py migrate adoptions

$ python manage.py showmigrations

$ python manage.py migrate --fake <app> zero
$ python manage.py migrate --fake adoptions zero
$ python manage.py migrate <app> zero
$ python manage.py migrate adoptions zero

### staticfiles
$ python manage.py collectstatic --no-input --clear

## packages
```
Package         Version   requirements.txt          Comment
--------------- -------   ----------------------    -----------------------
Django          3.1.6     Django==3.1.6             A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
asgiref         3.3.1                               ASGI specs, helper code, and adapters
pytz            2021.1                              World timezone definitions, modern and historical
sqlparse        0.4.1                               Non-validating SQL parser
psycopg2-binary 2.8.6     psycopg2-binary==2.8.6    psycopg2 - Python-PostgreSQL Database Adapter
gunicorn        20.0.4    gunicorn==20.0.4          WSGI HTTP Server for UNIX
Pillow          8.1.0     Pillow=8.1.0              Python Imaging Library (Fork) - ImageField
```
```
$ pip install django                 
$ pip install psycopg2-binary
$ pip install gunicorn
$ pip install Pillow
```

### examples
$ python manage.py load_pet_data
