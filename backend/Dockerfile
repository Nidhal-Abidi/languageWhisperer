FROM node:20-alpine

# **Install curl for the healthcheck**
RUN apk add --no-cache curl

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

# Expose API port
EXPOSE 3000

# Start the server
CMD ["npm", "run", "dev"]