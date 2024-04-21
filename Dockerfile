FROM node:lts-alpine

ARG PORT
ARG REDIS_PORT
ARG REDIS_HOST
ARG REDIS_INDEX
ENV PORT $PORT
ENV REDIS_PORT $REDIS_PORT
ENV REDIS_HOST $REDIS_HOST
ENV REDIS_INDEX $REDIS_INDEX

RUN mkdir -p /app

WORKDIR /app

COPY /app/src/package.json /app/src/package-lock.json /app/

RUN npm install

COPY /app/src/ .

EXPOSE ${PORT}

CMD [ "npm", "start"]