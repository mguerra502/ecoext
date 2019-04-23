FROM node:lts-alpine
# FROM node
ENV PORT 5000
EXPOSE 5000
RUN mkdir -p /app
WORKDIR /app

COPY package.json package.json

RUN npm install
RUN npm install -g nodemon
RUN mv node_modules/ ../node_modules/
CMD ["nodemon", "-L", "index.js"]