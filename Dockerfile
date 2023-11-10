# Build Stage
FROM node:16.20.2-alpine AS build

WORKDIR /usr/src/app

COPY .env package.json ./

RUN yarn install

COPY . .

RUN yarn build && rm -rf /node_modules && yarn install --production=true

# Final Stage
FROM node:16.20.2-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/.env /usr/src/app/package.json ./
COPY --from=build /usr/src/app/node_modules /usr/src/app/node_modules

EXPOSE 3000

CMD ["node", "dist/main.js"]