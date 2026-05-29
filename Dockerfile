# Stage-1
FROM node:24.11.1-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest @nestjs/cli@latest \
    && npm install

COPY . .

RUN npm run build

# Stage-2
FROM node:24.11.1 AS app

WORKDIR /app

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

RUN apt-get update && apt-get install gnupg wget -y && \
    wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install google-chrome-stable -y --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder app/public public
COPY --from=builder app/views views
COPY --from=builder app/package*.json ./
COPY --from=builder app/dist dist
COPY --from=builder app/node_modules node_modules

EXPOSE 3000

CMD ["npm", "run", "start:prod"]