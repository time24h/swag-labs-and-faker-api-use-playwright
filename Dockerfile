FROM docker pull mcr.microsoft.com/playwright:v1.40.1-jammy

RUN mkdir /app
WORKDIR /app
COPY . /app


RUN npm install --force
RUN npx playwright install