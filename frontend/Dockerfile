# Use an official Node runtime as the base image
FROM node:16-alpine

RUN npm install -g npm@latest

ENV npm_config_timeout=600000

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

RUN echo "PORT=3000" > .env

# Install any needed packages specified in package.json
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
