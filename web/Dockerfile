FROM node:16-alpine AS builder

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn run build

FROM node:16-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/build /app/build

CMD serve -s build