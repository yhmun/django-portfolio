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
$ mkdir apps/main && django-admin startapp main apps/main
$ mkdir apps/example_upload && django-admin startapp example_upload apps/example_upload

