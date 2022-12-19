FROM node:14-alpine as node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3002
CMD ["npm", "run", "start"]