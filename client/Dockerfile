# Build stage
FROM node:lts-alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies using npm ci for reproducible builds
RUN npm ci --only=production

# Copy the rest of the application files
COPY . .

# Build the frontend
RUN npm run build

# Use NGINX to serve the built frontend
FROM nginx:alpine

# Remove the default Nginx config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React files to Nginx public folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose the port used by Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]