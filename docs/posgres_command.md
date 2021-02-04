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
