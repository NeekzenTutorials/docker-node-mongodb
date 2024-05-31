FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g pm2
RUN apt-get update && apt-get install -y netcat-openbsd

COPY . .

RUN chmod 777 wait-for-it.sh

EXPOSE 8086