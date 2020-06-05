# Pull official base image
FROM python:3.8.3-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV HOME=/var/www

# Create directories
RUN mkdir -p $HOME/staticfiles
RUN mkdir -p $HOME/mediafiles

# Copy web appliction files
COPY . $HOME/

# Set working directory
WORKDIR $HOME

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Run server
CMD ./manage.py collectstatic --no-input --clear ; ./manage.py migrate --no-input ; gunicorn portfolio.wsgi:application --bind 0.0.0.0:8000