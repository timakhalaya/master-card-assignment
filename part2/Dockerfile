FROM node:16.13-alpine3.15 as build

RUN apk add --no-cache libc6-compat
RUN set -eux \
    & apk add \
        --no-cache \
        nodejs \
        yarn
RUN apk add git

WORKDIR /usr/app

COPY . .


RUN HUSKY_SKIP_INSTALL=true npm i --quiet --legacy-peer-deps && npm run build


EXPOSE 3000


# Running the app
CMD [ "npm", "run","ts:start" ]

HEALTHCHECK NONE
USER daemon