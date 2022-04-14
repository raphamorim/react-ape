FROM circleci/node:16.13.1

ENV NPM_CONFIG_LOGLEVEL info

COPY tests scripts packages package.json ./

RUN yarn install

CMD ["yarn", "run", "ci"]