FROM node:19-alpine as base
WORKDIR /app
COPY package.json ./
EXPOSE 3000

FROM base as dev
CMD ["sh", "-c", "yarn install && yarn next telemetry disable && yarn run dev"]

FROM base as builder
RUN yarn install
RUN yarn next telemetry disable
COPY . .
RUN yarn run build

FROM base as prod
WORKDIR /prod
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
CMD ["sh", "-c", "yarn install --production && yarn run start"]