# My Personal Workspace | com6.cc

This workspace is hosted at **https://com6.cc** and is built using the following technologies:

- NextJs for the front-end framework
- TypeScript for type checking and development
- TailwindCSS for styling
- ExpressJs for the backend framework
- NodeJs for the workers
- PostgreSQL as the database

# Notes to Myself

## Getting Set Up

1. Install Docker Desktop on the computer or server.

1. Clone this repository into a directory of choice.

1. In the main folder of the repository, change the name of `database-password.txt.sample` to `database-password.txt` and `backend-password.txt.sample` to `backend-password.txt`. Replace the content of `database-password.txt` and `backend-password.txt` with new, unique and random passwords.

1. In the main folder of the repository, change the name of every other `.txt.sample` files to `.txt`, then replace the content of the `.txt` file by the right informations. 

1. In the main folder of the repository, change the name of `cj-private-key.txt.sample` to `cj-private-key.txt` and `cj-config.txt.sample` to `cj-config.txt`, then replace the content of `cj-private-key.txt` and `cj-config.txt` with the private key, user id, and subscription id from cj.

1. In the main folder of the repository, change the name of `smtp-config.txt.sample` to `smtp-config.txt`, then replace the content of `smtp-config.txt` with valid SMTP parameters.

1. In the main folder of the repository, change the name of `pushover-config.txt.sample` to `pushover-config.txt`, then replace the content of `pushover-config.txt` with the pushover parameters.

1. To set up the environment for the application, rename the `env.sample` file in the root directory to `.env`. To run the application in production mode, set the `DOCKER_ENV` variable to `prod` in the `.env` file. If `DOCKER_ENV` is not set, it defaults to `dev` (development mode).

1. To spin up the entire environment, run the command: `docker compose up`.

1. To rebuild all docker images at once, run the command: `docker compose build`.

1. To stop all the running containers, run the command: `docker compose down`.

## Technical Notes

- The front-end (NextJs/TypeScript/TailwindCSS) runs on external port 80 and internal port 3000.

- The backend (ExpressJs/TypeScript) runs on port 3001. The Admin username is 'admin' and the password is stored in the file backend-password.txt (root directory).

- The worker (NodeJs/TypeScript) runs on an internal port.

- The database (PostgreSQL) runs on port 5432. The Admin username is 'postgres' and the password is stored in the file database-password.txt (root directory).

- For development testing, access the application in the browser by using 'localtest.me' instead of the typical 'localhost'.

## Unit Testing

- To run unit tests, use the command: `docker exec <CONTAINER_ID> yarn run test`. Please replace the <CONTAINER_ID> with the appropriate container id. To find the container ID, use the command `docker container ls` or `docker ps`.
