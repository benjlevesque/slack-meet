FROM node:10-alpine

WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock ./yarn.lock
# Expose the app port
RUN yarn
COPY src ./src
RUN yarn build


ENV NODE_ENV=production
ENV HOST 0.0.0.0

EXPOSE 3000
CMD ["node", "build/main.js"]