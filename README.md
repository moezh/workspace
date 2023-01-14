# MH - Personal Workspace

This workspace is hosted at **https://mh.com6.cc** and is built using the following technologies:

- NextJs for the front-end framework
- TypeScript for type checking and development
- TailwindCSS for styling
- ExpressJs for the backend framework
- NodeJs for the worker
- PostgreSQL as the database

## Getting Set Up

1. Install Docker Desktop on your computer or server.

1. Clone this repository into a directory of your choice.

1. In the root directory of the repository, you will find files `database-password.txt` and `backend-password.txt`. Please update them with your own passwords.

1. To run the application in production mode, set the `DOCKER_ENV` variable to `prod` in the environment file `.env` (root directory). By default, the environment variable `DOCKER_ENV` is unset and defaults to `dev` (development mode).

1. To spin up the entire environment, run the command: `docker compose up`.

1. To rebuild all docker images at once, run the command: `docker compose build`.

1. To stop all the running containers, run the command: `docker compose down`.

## Technical Notes

- The front-end (NextJs/TypeScript/TailwindCSS) runs on external port 80 and internal port 3000.

- The backend (ExpressJs/TypeScript) runs on port 3001. The Admin username is 'admin' and the password is stored in the file backend-password.txt (root directory).

- The worker (NodeJs/TypeScript) runs on an internal port.

- The database (PostgreSQL) runs on port 5432. The Admin username is 'postgres' and the password is stored in the file database-password.txt (root directory)

## Unit Testing

- To run unit tests, use the command: `docker exec <CONTAINER_ID> yarn run test`. Please replace the <CONTAINER_ID> with the appropriate container id. To find the container ID, use the command `docker container ls` or `docker ps`.
