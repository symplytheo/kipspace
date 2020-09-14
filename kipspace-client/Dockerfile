FROM node:14.4.0

# Create app directory
ENV APP_ROOT /src

RUN mkdir ${APP_ROOT}; exit 0
WORKDIR ${APP_ROOT}
ADD . ${APP_ROOT}

# global install & update
RUN npm i -g npm && npm i -g yarn; exit 0

# RUN rm yarn.lock
RUN yarn
RUN yarn build

ENV HOST 0.0.0.0
EXPOSE 3000

# start command
# CMD [ "yarn", "start" ]