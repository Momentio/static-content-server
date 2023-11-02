FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* .env*  ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

FROM base AS runner

ARG CONTENT_SERVER_USER
ARG CONTENT_SERVER_PASSWORD

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules

ENV CONTENT_SERVER_PORT 3000
ENV CONTENT_SERVER_USER $CONTENT_SERVER_USER
ENV CONTENT_SERVER_PASSWORD $CONTENT_SERVER_PASSWORD

EXPOSE 3000

CMD ["node", "dist/index.js"]
