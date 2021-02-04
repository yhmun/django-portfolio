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

### migrations
$ python manage.py makemigrations <app>
$ python manage.py makemigrations adoptions

$ python manage.py sqlmigrate <app> 0001
$ python manage.py migrate
$ python manage.py migrate adoptions

$ python manage.py showmigrations

$ python manage.py migrate --fake <app> zero
$ python manage.py migrate --fake adoptions zero
$ python manage.py migrate <app> zero
$ python manage.py migrate adoptions zero

### examples
$ python manage.py load_pet_data
