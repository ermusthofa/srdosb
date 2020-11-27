FROM node:12.19.0 as builder

ARG ARG_NODE_ENV
ARG ARG_VUE_APP_PUBLIC_PATH

WORKDIR /app

COPY ["package.json", "/app/"]
RUN yarn install

COPY . /app

ENV NODE_ENV=${ARG_NODE_ENV}
ENV VUE_APP_PUBLIC_PATH=${ARG_VUE_APP_PUBLIC_PATH}

RUN yarn build

FROM nginx:1.14.0-alpine

COPY deployment/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html