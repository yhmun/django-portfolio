### Prerequisite
- Make sure that the python3 package is installed.
- Change a working directory

### Creating a virtual environment
```
$ python3 -m venv venv
```

### Activating the virtual environment
- Regardless of which version of Python you are using, when the virtual environment is activated, you should use the pip command (not pip3)
```
$ source venv/bin/activate
```

### Upgragding python package installer 
```
(venv) $ pip install --upgrade pip
```

### Installing Django
```
(venv) $ pip install django
```

### Freezing installed packages in requirements format
```
(venv) $ pip freeze > requirements.txt
```

### Installing dependecies from requirements file
```
(venv) $ pip install -r requirements.txt
```

### Deactivating the virtual environment
```
(venv) $ deactivate
```

### Packages
```
(venv) $ pip install django                 # A high-level Python Web framework that encourages rapid development and clean, pragmatic design.
       - pip install asgiref                # ASGI specs, helper code, and adapters
       - pip install pytz                   # World timezone definitions, modern and historical
       - pip install sqlparse               # Non-validating SQL parser
(venv) $ pip install psycopg2-binary        # psycopg2 - Python-PostgreSQL Database Adapter
(venv) $ pip install djangorestframework    # Web APIs for Django, made easy.
(venv) $ pip install Pillow                 # Python Imaging Library (Fork)
(venv) $ pip install gunicorn               # WSGI HTTP Server for UNIX
(venv) $ pip install django-cleanup         # Deletes old files
```

### Creating a project
```
(venv) $ django-admin startproject portfolio .
```


