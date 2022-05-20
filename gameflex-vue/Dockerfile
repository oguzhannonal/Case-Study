FROM node:16.15-alpine
RUN npm i -g serve
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run dev
