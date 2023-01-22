FROM node:19-alpine as base
WORKDIR /app
COPY package.json ./
EXPOSE 3001

FROM base as dev
CMD ["sh", "-c", "yarn install && yarn run dev"]

FROM base as prod
CMD ["sh", "-c", "yarn install && yarn run build && yarn run prod"]