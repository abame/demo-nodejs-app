FROM bitnami/node:20.3.1-debian-11-r3@sha256:348cf7ec9f6901daf791ace21846fabe1c372f907919e99b07a2dbbd1b0b0052 as builder

WORKDIR /code

COPY . .

RUN yarn install \
    && yarn build \
    && rm -rf node_modules \
    && yarn install --production 

RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh \
    && node-prune

FROM node:20.3.1-bullseye-slim@sha256:18cfcccefacb1bb2ca8df40f881cca0f1eedeae020154e6b07eddad0073bdc8e

WORKDIR /app

COPY --from=builder /code/node_modules /app/node_modules
COPY --from=builder /code/dist /app
COPY --from=builder /code/views /app/views

RUN mkdir -p /app/node_modules/.cache \
    && chown -R 1001:1001 /app/node_modules/.cache \
    && touch /app/access.log \
    && chown 1001:1001 /app/access.log

USER 1001:1001

HEALTHCHECK CMD curl --fail http://localhost:3000/hello-world || exit 1

CMD ["node", "./index.js"]
