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


FROM node:16.13-alpine3.15 as run


WORKDIR /usr/app

COPY --from=build /usr/app/package*.json ./
COPY --from=build /usr/app/dist/ ./dist


RUN npm ci --only=prod --legacy-peer-deps --quiet

RUN ls

EXPOSE 3000

CMD [ "npm", "run","ts:start" ]

HEALTHCHECK NONE
USER daemon