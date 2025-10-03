# Stage 1: Builder - for installing dependencies and building assets
FROM node:18 AS builder

WORKDIR /app

# Copy package.json to leverage Docker cache
COPY package.json ./
# In a real-world scenario, you would also copy the lock file (e.g., package-lock.json)
# RUN npm ci --only=production would be preferred with a lock file
RUN npm install

# Copy the rest of the backend source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Production - for running the application
FROM node:18-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

# Expose the port that the application runs on
EXPOSE 3000

# Command to start the application
CMD ["node", "src/index.js"]
