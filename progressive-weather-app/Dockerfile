FROM node:12.16.0 as builder

WORKDIR /app

COPY ["package.json", "yarn.lock", "/app/"]
RUN yarn install

COPY . /app
RUN yarn build

FROM nginx:1.14.0-alpine

COPY deployment/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html