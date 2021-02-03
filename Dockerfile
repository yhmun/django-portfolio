# Pull official base image
FROM python:3.8.3-slim-buster

RUN apt-get update && apt-get install -y netcat

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV HOME=/home/app
ENV APP_HOME=/home/app/web

# Create the appropriate directories
RUN mkdir -p $APP_HOME
RUN mkdir $APP_HOME/staticfiles
RUN mkdir $APP_HOME/mediafiles
WORKDIR $APP_HOME

# Install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt $APP_HOME
RUN pip install -r requirements.txt

# Copy entrypoint.sh
COPY ./entrypoint.sh $APP_HOME

# Copy web appliction files
COPY . $APP_HOME

# Run entrypoint.sh
ENTRYPOINT ["/home/app/web/entrypoint.sh"]
