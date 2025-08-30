# Use Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Build React app
RUN npm run build

# Default command (optional, just prevents container from exiting)
CMD ["sh", "-c", "echo Build complete && tail -f /dev/null"]
