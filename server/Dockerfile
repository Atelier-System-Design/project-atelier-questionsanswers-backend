FROM node:19-alpine

WORKDIR /dockerqa

COPY . .

RUN npm install

EXPOSE 4000

CMD ["npm", "start"]