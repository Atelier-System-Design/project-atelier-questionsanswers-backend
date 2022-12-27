FROM node:19-alpine

WORKDIR /server

COPY . .

RUN npm install

EXPOSE 4000

CMD ["node", "server.js"]