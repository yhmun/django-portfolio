## Virtual environment
$ python3 -m venv venv
$ source venv/bin/activate
$ deactivate

## pip packages
$ pip install --upgrade pip
$ pip install django
$ pip list
$ pip freeze > requirements.txt
$ pip install -r requirements.txt

## django command
$ django-admin startproject web .
$ ./manage.py migrate
$ ./manage.py runserver
$ mkdir -p apps/main && django-admin startapp main apps/main
$ mkdir -p apps/example/file_upload && django-admin startapp file_upload apps/example/file_upload
$ mkdir -p apps/example/adoptions && django-admin startapp adoptions apps/example/adoptions
$ python manage.py makemigrations adoptions
$ python manage.py migrate adoptions
$ python manage.py showmigrations
