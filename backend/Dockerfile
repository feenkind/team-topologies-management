FROM node:16-alpine3.15 as builder

WORKDIR /src

COPY package*.json ./
COPY prisma ./prisma

RUN npm ci --foreground-scripts true

FROM node:16-alpine3.15 as development

WORKDIR /usr/src/app

COPY . ./

COPY --from=builder /src/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

FROM node:16-alpine3.15 as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=builder /src/node_modules ./node_modules
COPY --from=builder /src/package*.json ./
COPY --from=builder /src/prisma ./prisma
COPY --from=development /usr/src/app/dist ./dist

CMD [ "npm", "run", "start:prod" ]
