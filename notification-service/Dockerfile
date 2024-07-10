# Use Node.js LTS version as base image
FROM node:lts-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port on which the application runs
EXPOSE 5001

# Command to run the application
CMD ["npm", "start"]
