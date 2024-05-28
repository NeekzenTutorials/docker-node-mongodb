# docker-node-mongodb

## How to use ?

* Write the .env file at the root of the project

```bash
MONGO_PASSWORD=password
MONGO_USER=root
MONGO_DB=database
MONGO_PORT=27017
MONGO_HOST=localhost
MONGO_NAME=name
PORT=3000

MONGO_URI="mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_NAME}?authSource=admin"

NAME=node-app
```

* build and start the docker engine

```bash
>>> docker-compose build --no-cache

>>> docker-compose up -d
```

* You can now go to your browser 

