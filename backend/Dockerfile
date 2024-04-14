FROM node:20.10.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install strapi -g

COPY . .

EXPOSE 1337

CMD ["npm", "run", "develop"]