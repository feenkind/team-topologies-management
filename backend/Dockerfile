FROM node:16-alpine3.15 as builder

WORKDIR /src

COPY package*.json ./

RUN npm ci --foreground-scripts true

FROM node:16-alpine3.15 as development

WORKDIR /usr/src/app

COPY . ./

COPY --from=builder /src/node_modules ./node_modules

RUN npm run build

FROM node:16-alpine3.15 as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /src/node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
