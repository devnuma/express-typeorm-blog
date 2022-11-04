FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn build

FROM node:18-alpine AS server
WORKDIR /app
COPY package* ./
RUN yarn --production
COPY --from=builder ./app/public ./public
COPY --from=builder ./app/build ./build
EXPOSE 8000
CMD ["yarn", "start"]