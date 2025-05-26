FROM node:20-alpine

# **Install curl for the healthcheck**
RUN apk add --no-cache curl

WORKDIR /app

# Copy package definitions and install deps
COPY package.json package-lock.json* ./
RUN npm install

# Copy rest of the source
COPY . .

# Expose Vite’s default port
EXPOSE 5173

# Start Vite in dev mode
CMD ["npm", "run", "dev"]
