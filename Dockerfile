FROM node:18-alpine as ts-build

WORKDIR /app

COPY . /app
RUN yarn install
RUN yarn build

FROM node:18-alpine as ts-runtime

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
COPY ./prisma /app
COPY --from=ts-build /app/dist /app/dist

RUN yarn install --production

EXPOSE 3000

CMD yarn start