FROM node:14-alpine as node
WORKDIR /app
ADD package.json /app/package.json
RUN npm install
COPY src /app/src
COPY tsconfig.json /app/tsconfig.json
RUN npm run build
EXPOSE 3002
CMD ["npm", "run", "start"]

