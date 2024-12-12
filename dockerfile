# This is the dockerfile to build our Piazza app for cloud computing concepts


# Use the Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to run the app 
EXPOSE 3000

# Start the server with 
CMD ["node", "server.js"]
