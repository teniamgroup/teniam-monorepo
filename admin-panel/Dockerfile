# Build stage
FROM node:20-slim AS builder
WORKDIR /app

# Accept build-time environment variables
ARG VITE_MEDUSA_BACKEND_URL
ARG VITE_MEDUSA_STOREFRONT_URL
ENV VITE_MEDUSA_BACKEND_URL=$VITE_MEDUSA_BACKEND_URL
ENV VITE_MEDUSA_STOREFRONT_URL=$VITE_MEDUSA_STOREFRONT_URL

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .

# Ensure VITE_ variables are available at build time
RUN npm run build:preview

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
# For SPAs, we need to redirect all 404s to index.html
RUN sed -i 's/index  index.html index.htm;/index  index.html index.htm; try_files $uri $uri\/ \/index.html;/g' /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
