# Stage 1: Build React app
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

# Increase memory limit to 4GB for the build step
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build

# Stage 2: Use plain Node.js (no Nginx for now)
FROM node:20-alpine

WORKDIR /app
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["npx", "serve", "dist"]
