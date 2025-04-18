# Language whisperer project

## Running the project with docker while making changes:

    + `docker compose down -v && docker compose build && docker compose up`

## Inspect a certain docker container
    + `docker inspect --format='{{json .State.Health}}' <container-name>`