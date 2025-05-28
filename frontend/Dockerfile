# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of your React source
COPY . .

# Build the production bundle
RUN npm run build

# 2) Serve with nginx
FROM nginx:stable-alpine
# Remove default HTML
RUN rm -rf /usr/share/nginx/html/*

# Copy React build artifacts
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
