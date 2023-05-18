FROM node:18-alpine
WORKDIR /app

COPY database /app/database

COPY processor /app/processor

COPY package.json /app/
COPY yarn.lock /app/

RUN yarn install --pure-lockfile --non-interactive --cache-folder ./ycache; rm -rf ./ycache
WORKDIR /app/processor
# RUN yarn workspace @techstack-ranking/processor run build

CMD ["npx", "ts-node", "src/index.ts"]
