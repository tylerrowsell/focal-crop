# build environment
FROM node:16.9.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY yarn.lock ./
RUN yarn install --silent
# RUN yarn add react-scripts@3.4.1 -g --silent
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable

RUN apt update \
  && DEBIAN_FRONTEND=noninteractive apt install -y \
  net-tools \
  wget \
  && apt clean \
  && rm -rf /var/lib/apt/lists/*

ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /sbin/tini
RUN chmod +x /sbin/tini

RUN wget https://github.com/Shopify/ejson/releases/download/v1.2.1/ejson_1.2.1_amd64.deb \
  && dpkg -i ejson_1.2.1_amd64.deb \
  && rm ejson_1.2.1_amd64.deb

WORKDIR /app

COPY --from=build /app/build /usr/share/nginx/html
COPY config /app/config
COPY scripts/docker-entrypoint.sh /app/scripts/
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod +x /app/scripts/docker-entrypoint.sh
ENTRYPOINT ["/sbin/tini", "--", "/app/scripts/docker-entrypoint.sh"]