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
$ mkdir -p apps/example/hashing && \
    django-admin startapp hashing apps/example/hashing
$ mkdir -p apps/example/pizza && \
    django-admin startapp pizza apps/example/pizza
$ mkdir -p apps/example/store && \
    django-admin startapp store apps/example/store

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
Package              Version   requirements.txt             Comment
-------------------- -------   --------------------------   -----------------------
Django               3.1.6     Django==3.1.6                A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
asgiref              3.3.1                                  ASGI specs, helper code, and adapters
pytz                 2021.1                                 World timezone definitions, modern and historical
sqlparse             0.4.1                                  Non-validating SQL parser
psycopg2-binary      2.8.6     psycopg2-binary==2.8.6       psycopg2 - Python-PostgreSQL Database Adapter
gunicorn             20.0.4    gunicorn==20.0.4             WSGI HTTP Server for UNIX
Pillow               8.1.0     Pillow=8.1.0                 Python Imaging Library (Fork) - ImageField
django-widget-tweaks 1.4.8     django-widget-tweaks=1.4.8   Tweak the form field rendering in templates, not in python-level form definitions.
djangorestframework  3.12.2    djangorestframework==3.12.2  Web APIs for Django, made easy.
```
```
$ pip install django                 
$ pip install psycopg2-binary
$ pip install gunicorn
$ pip install Pillow
$ pip install django-widget-tweeks
$ pip install djangorestframework
```

## test
$ python manage.py test

## backup
$ python manage.py dumpdata jobs.job > dumpfiles/jobs_job.json

### examples
$ python manage.py load_pet_data
