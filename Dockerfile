FROM node:latest

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY src/ ./src

RUN yarn install

# CMD [ "yarn", "run", "serve:main" ]
# EXPOSE 3000