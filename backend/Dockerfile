# Use Node.js 20 base image
FROM node:20 AS builder

# Install build essentials
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install all dependencies for build
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy search and other source code
COPY . .

# Build the Medusa project
RUN yarn build

# Production image
FROM node:20-slim AS runner

# Install runtime dependencies for native modules
RUN apt-get update && apt-get install -y \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package.json and yarn.lock
COPY --from=builder /app/package.json /app/yarn.lock ./

# Install production dependencies only
ENV CI=1
RUN yarn config set network-timeout 600000 && \
    yarn config set network-concurrency 1 && \
    yarn install --frozen-lockfile --verbose

# Copy built files from builder
# We copy everything in .medusa/server to the root
COPY --from=builder /app/.medusa/server/ ./

# Set environment variables
ENV NODE_ENV=production

# Expose port (Railway uses PORT environment variable)
EXPOSE 9000

# Start Medusa with migrations and optional seeding
# Use npx medusa directly to avoid yarn overhead and potential path issues
CMD ["sh", "-c", "npx medusa db:migrate && if [ \"$MEDUSA_SEED\" = \"true\" ]; then npx medusa exec ./src/scripts/seed.ts; fi && npx medusa start"]
