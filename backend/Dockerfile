FROM node:19-alpine as base
WORKDIR /app
COPY package.json ./
EXPOSE 3001

FROM base as dev
CMD ["sh", "-c", "yarn install && yarn run dev"]

FROM base as builder
RUN yarn install
COPY . .
RUN yarn run build

FROM base as prod
WORKDIR /prod
COPY --from=builder /app/package.json ./
COPY --from=builder /app/build ./build
CMD ["sh", "-c", "yarn install --production && yarn run prod"]