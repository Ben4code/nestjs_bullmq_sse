FROM node:20-bullseye

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package.json  package-lock.json ./

RUN npm install

COPY . .

RUN rm -rf .nx

EXPOSE 3000

CMD [ "npm", "run", "dev" ]