FROM node:22-alpine

WORKDIR /app

COPY package.json ./package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
# Expose the app port
RUN corepack enable
RUN pnpm install
COPY src ./src

ENV NODE_ENV=production
ENV HOST 0.0.0.0

EXPOSE 3000
CMD ["node", "src/main.js"]
