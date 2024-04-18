# Use the official Node.js 16 image.
# https://hub.docker.com/_/node
FROM node:21.7.2-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# RUN npm config set NO_PROXY=registry.npmjs.org
RUN npm install 
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/app

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE  5000

CMD [ "npm", "start"]
