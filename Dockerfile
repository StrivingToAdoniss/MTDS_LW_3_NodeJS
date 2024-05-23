# Use the official Node.js image as the build stage
FROM node:14 AS builder

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Use the official Node.js image for the runtime stage
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app .

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
