FROM node:8.11.2

WORKDIR /usr/app

COPY package*.json ./

RUN npm install -qy

COPY ./ ./

EXPOSE 3000

CMD ["npm", "start"]
