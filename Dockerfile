FROM node:17.3.1-alpine

COPY package.json /data/
COPY package-lock.json /data/
COPY src /data/src

RUN cd /data && npm i --only=production

WORKDIR /data

EXPOSE 8080

CMD ["npm", "start"]
