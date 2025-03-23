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

# Debug: List files
RUN ls -la dist/
RUN ls -la dist/client/
RUN ls -la dist/server/

# Make sure entry.js is in the right place
RUN cp src/entry.js dist/

# Set the working directory to where the built files are
WORKDIR /app/dist

# Start the server with debugging
CMD ["node", "--trace-warnings", "entry.js"] 