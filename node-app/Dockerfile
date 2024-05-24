FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g pm2

COPY . .

EXPOSE 3000

CMD ["sh", "-c", "pm2 start server.js --name myapp && node watch.js"]
