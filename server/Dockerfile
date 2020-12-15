# get the base node.js image
FROM node:14-alpine

# set the working dir for container
WORKDIR /server

# copy the json file first
COPY package*.json ./

# install npm dependencies
RUN npm install

# copy other project files
COPY . .

# expose port 5000
EXPOSE 5000

# start the server
CMD ["npm", "start"]
 