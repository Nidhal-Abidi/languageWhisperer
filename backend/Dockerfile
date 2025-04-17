FROM node:22-slim

# Install curl for healthcheck
RUN apt-get update && apt-get install -y curl

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Transpile Typescript to Javascript
RUN npm run build

# Create directory for audio files
RUN mkdir -p /app/audio

RUN ls -la /app

# Expose API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the server
CMD ["npm", "run", "dev"]