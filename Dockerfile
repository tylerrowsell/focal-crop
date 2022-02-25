# pull official base image
FROM node:16.9.1-alpine

# set working directory
WORKDIR /src

# add `/app/node_modules/.bin` to $PATH
ENV PATH /src/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn

# add app
COPY . ./

# start app
CMD ["yarn", "start"]