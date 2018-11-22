FROM node:8-alpine
# FROM node

ENV PORT 5000
EXPOSE 5000

RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json

RUN apk add --update nodejs nodejs-npm
RUN npm config set registry https://registry.npmjs.org
RUN npm install


RUN mv node_modules/ ../node_modules/

RUN npm install -g nodemon

# CMD ["node", "index.js"]