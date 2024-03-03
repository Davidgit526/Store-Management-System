# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV MONGO_URI=mongodb://mongo:27017/store

# Run the application
CMD ["node", "app.js"]
