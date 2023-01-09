FROM node:16

WORKDIR /dockerqa

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]