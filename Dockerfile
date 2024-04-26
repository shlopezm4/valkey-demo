FROM node:lts-alpine

ARG PORT
ARG VALKEY_PORT
ARG VALKEY_HOST
ARG VALKEY_INDEX
ENV PORT $PORT
ENV VALKEY_PORT $VALKEY_PORT
ENV VALKEY_HOST $VALKEY_HOST
ENV VALKEY_INDEX $VALKEY_INDEX

RUN mkdir -p /app

WORKDIR /app

COPY /app/src/package.json /app/src/package-lock.json /app/

RUN npm install

COPY /app/src/ .

EXPOSE ${PORT}

CMD [ "npm", "start"]