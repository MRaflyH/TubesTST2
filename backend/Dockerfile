# Use a Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port the app runs on (e.g., 5000)
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
