FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
RUN npm install esm cors express mongoose body-parser jsonwebtoken express-jwt
COPY . .

CMD [ "npm", "start" ]
EXPOSE 8000