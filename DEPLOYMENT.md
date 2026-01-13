# Production Deployment Guide: Mercur Marketplace

This guide outlines how to deploy your Marketplace to any cloud provider (AWS, Railway, DigitalOcean, etc.) using Docker.

## 🚀 One-Command Deployment

The easiest way to run the entire marketplace (Backend + 3 Frontends + Databases) is using the root `docker-compose.yml`:

```bash
docker-compose up --build -d
```

## 🔐 Environment Variables

You MUST configure these in your production environment.

### 1. Backend (`/backend`)

| Variable                | Description                | Recommended Value                   |
| :---------------------- | :------------------------- | :---------------------------------- |
| `DATABASE_URL`          | Postgres connection string | `postgres://user:pass@host:5432/db` |
| `REDIS_URL`             | Redis connection string    | `redis://host:6379`                 |
| `JWT_SECRET`            | Secret for auth tokens     | Generate a random 32-char string    |
| `COOKIE_SECRET`         | Secret for session cookies | Generate a random 32-char string    |
| `STRIPE_SECRET_API_KEY` | Stripe Secret Key          | `sk_test_...`                       |
| `STORE_CORS`            | URL of your storefront     | `https://your-storefront.com`       |
| `ADMIN_CORS`            | URL of your admin panel    | `https://your-admin.com`            |
| `VENDOR_CORS`           | URL of your vendor panel   | `https://your-vendor.com`           |

### 2. Frontends (Admin, Vendor, Storefront)

For **Vite** (Admin/Vendor) and **Next.js** (Storefront), these variables are required **at build time**:

| Variable                  | Service        | Required For |
| :------------------------ | :------------- | :----------- |
| `VITE_MEDUSA_BACKEND_URL` | Admin & Vendor | Build        |
| `MEDUSA_BACKEND_URL`      | Storefront     | Build        |
| `NEXT_PUBLIC_STRIPE_KEY`  | Storefront     | Build        |

## 🏗️ Docker Architecture

- **Backend**: Node.js/Medusa v2 (Exposed on 9000)
- **Admin/Vendor**: Nginx-based static serving (Exposed on 80)
- **Storefront**: Next.js Server (Exposed on 3000)
- **Infrastructure**: Official Postgres 16 & Redis Alpine images.

## 🚉 Railway Specifics

If deploying to Railway individually:

1. Create a service for each folder.
2. Set the **Root Directory** in Settings.
3. Railway will automatically find the `Dockerfile` and build.
