# Railway Production Deployment Guideline

This guide provides the necessary environment variables and steps to set up Mercur Marketplace on Railway.

## 1. Prerequisites (Railway Dashboard)

1. **PostgreSQL**: Create a PostgreSQL database on Railway.
2. **Redis**: Create a Redis instance on Railway.
3. **Services**: Railway will automatically detect the services from `railway.json`.

---

## 2. Environment Variables

### Mercur Backend (`backend`)

| Variable                | Value/Source                              |
| ----------------------- | ----------------------------------------- |
| `DATABASE_URL`          | `${{Postgres.DATABASE_URL}}`              |
| `REDIS_URL`             | `${{Redis.REDIS_URL}}`                    |
| `JWT_SECRET`            | Generate a random string                  |
| `COOKIE_SECRET`         | Generate a random string                  |
| `STORE_CORS`            | `https://your-storefront-url.railway.app` |
| `ADMIN_CORS`            | `https://your-admin-url.railway.app`      |
| `VENDOR_CORS`           | `https://your-vendor-url.railway.app`     |
| `AUTH_CORS`             | Comma separated list of all panel URLs    |
| `STRIPE_SECRET_API_KEY` | Your Stripe Secret Key (sk*test*...)      |
| `NODE_ENV`              | `production`                              |

### Admin Panel (`admin-panel`)

| Variable                     | Value/Source                              |
| ---------------------------- | ----------------------------------------- |
| `VITE_MEDUSA_BACKEND_URL`    | `https://your-backend-url.railway.app`    |
| `VITE_MEDUSA_STOREFRONT_URL` | `https://your-storefront-url.railway.app` |

### Vendor Panel (`vendor-panel`)

| Variable                     | Value/Source                              |
| ---------------------------- | ----------------------------------------- |
| `VITE_MEDUSA_BACKEND_URL`    | `https://your-backend-url.railway.app`    |
| `VITE_MEDUSA_STOREFRONT_URL` | `https://your-storefront-url.railway.app` |
| `VITE_TALK_JS_APP_ID`        | Your TalkJS ID (if used)                  |

### Storefront (`storefront`)

| Variable                             | Value/Source                              |
| ------------------------------------ | ----------------------------------------- |
| `MEDUSA_BACKEND_URL`                 | `https://your-backend-url.railway.app`    |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Obtain from Medusa Admin (API Key)        |
| `NEXT_PUBLIC_BASE_URL`               | `https://your-storefront-url.railway.app` |
| `NEXT_PUBLIC_STRIPE_KEY`             | Your Stripe Publishable Key (pk*test*...) |

---

## 3. Stripe Integration

To integrate Stripe for the marketplace (Stripe Connect):

1. **Stripe Dashboard**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/).
   - Copy your **Secret Key** (`sk_...`) and **Publishable Key** (`pk_...`).
2. **Medusa Configuration**:
   - The `@mercurjs/payment-stripe-connect` plugin is already configured in `medusa-config.ts`.
   - It expects `STRIPE_SECRET_API_KEY` in the backend environment.
3. **Webhooks**:
   - Create a webhook in Stripe pointing to `https://your-backend-url.railway.app/stripe/hooks`.
   - Note the Webhook Secret and add it as `STRIPE_WEBHOOK_SECRET` in the backend if needed (depending on plugin requirements).

---

## 4. Deployment Steps

1. Push your code with the new `Dockerfile` and `railway.json`.
2. In Railway, click **"New"** -> **"GitHub Repo"**.
3. Railway will start setting up the services. **IMPORTANT**: For each service, you MUST go to **Settings** -> **General** -> **Root Directory** and set it correctly:
   - `mercur-backend` -> `/backend`
   - `mercur-admin` -> `/admin-panel`
   - `mercur-vendor` -> `/vendor-panel`
   - `mercur-storefront` -> `/storefront`
4. Add the environment variables to each service.
5. Railway will automatically build using the local `Dockerfile`.
