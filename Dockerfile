FROM node:17-alpine3.12
 
WORKDIR /usr/src/app
 
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package-lock.json ./
 
# Install any needed packages
RUN npm i
 
# Bundle app source
COPY . .
 
EXPOSE 4200
 
CMD [ "npm", "start" ]
