FROM node:12.19.0 as builder

ARG ARG_NODE_ENV
ARG ARG_VUE_APP_CDN_URL

WORKDIR /app

COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn install

COPY . /app

ENV NODE_ENV=${ARG_NODE_ENV}
ENV VUE_APP_CDN_URL=${ARG_VUE_APP_CDN_URL}

RUN yarn build

FROM nginx:1.14.0-alpine

COPY deployment/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html