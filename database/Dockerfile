FROM postgres:15-alpine
EXPOSE 5432
COPY initdb.sql /docker-entrypoint-initdb.d/
COPY initdb_blog.sql /docker-entrypoint-initdb.d/
COPY initdb_store.sql /docker-entrypoint-initdb.d/
COPY initdb_web3.sql /docker-entrypoint-initdb.d/
COPY initdb_workout.sql /docker-entrypoint-initdb.d/