FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8000

CMD [ "npx", "pm2-runtime", "start" , "src/server.js", "-i", "max"]
