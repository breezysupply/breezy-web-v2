# Use Node.js 18.19.0 as base
FROM node:18.19.0-slim

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 8080

# Start the server
CMD ["node", "src/entry.js"] 