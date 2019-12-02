FROM node:alpine

COPY package.json /data/
COPY package-lock.json /data/
COPY .jshintrc /data/
COPY src /data/src

RUN cd /data && npm i && npm test

WORKDIR /data

EXPOSE 8080

CMD ["node", "src/index.js"]
