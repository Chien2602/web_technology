FROM node:20

WORKDIR /app

COPY package*.json ./
RUN yarn install

# copy .env file
COPY .env . 

# copy source code
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
