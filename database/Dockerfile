FROM mysql:latest

COPY ./meetings_management.sql /docker-entrypoint-initdb.d/

# docker run --name meetings-db -d -e MYSQL_ALLOW_EMPTY_PASSWORD=1 -e MYSQL_DATABASE=meetings_management -e MYSQL_TCP_PORT=3306 -p 3309:3306 meetings-db:1.0.0
