## List of databases
$ \l

## Connect a database
$ \c <db_name>

## List of relations
$ \dt

## Exit
$ \q

## Dump
$ pg_dump -h localhost -p 5432 -U user -W --table="jobs_job" --data-only --column-inserts web_dev > jobs_job.sql

## DDL
$ CREATE DATABASE <datbase>;
$ CREATE USER <username> WITH PASSWORD '<password>';
$ ALTER ROLE <username> SET client_encoding TO 'utf8';
$ ALTER ROLE <username> SET default_transaction TO 'read committed';
$ ALTER ROLE <username> SET timezone TO 'UTC';
$ GRANT ALL PRIVILEGES ON DATABASE <datbase> TO <username>;