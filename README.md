# EasyStore

A full-stack ecommerce app with a React + Vite frontend and an Express + MongoDB backend.

## Live Links

- Frontend: https://easycartreact.vercel.app
- Backend example endpoint: https://easycart-u08y.onrender.com/api/products

## Features

- Product listing with keyword search
- Cart management (add, update quantity, remove)
- Delivery option selection per cart item
- Payment summary calculation (subtotal, shipping, tax, total)
- Order placement from cart
- Orders history and per-order details
- Tracking page by order + product
- Reset endpoint for quickly reseeding demo data

## Tech Stack

### Frontend

- React 19
- React Router 7
- Axios
- Vite

### Backend

- Node.js + Express
- MongoDB + Mongoose
- UUID
- CORS + dotenv

## Monorepo Structure

```text
.
├── backend/    # Express API, MongoDB models, seeding
└── frontend/   # React app (Vite)
```

## Prerequisites

- Node.js 20+ (recommended for current Vite toolchain)
- npm
- MongoDB (local or hosted)

## Local Development

### 1) Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 2) Configure environment variables

Create `backend/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/easystore
PORT=3000
NODE_ENV=development
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

### 3) Run backend

```bash
cd backend
npm run dev
```

Backend starts on `http://localhost:3000` by default.

### 4) Run frontend

```bash
cd frontend
npm run dev
```

Frontend starts on `http://localhost:5173` by default.

## Available Scripts

### Backend (`backend/package.json`)

- `npm run dev` - run with nodemon
- `npm start` - run with node
- `npm run zip` - create image zip using `zipFiles.js`

### Frontend (`frontend/package.json`)

- `npm run dev` - start Vite dev server
- `npm run build` - production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## Backend API Overview

Base URL: `http://localhost:3000`

### Products

- `GET /api/products`
- `GET /api/products?search=shirt`

### Delivery Options

- `GET /api/delivery-options`
- `GET /api/delivery-options?expand=estimatedDeliveryTime`

### Cart Items

- `GET /api/cart-items`
- `GET /api/cart-items?expand=product`
- `POST /api/cart-items`
	- body: `{ "productId": "...", "quantity": 1 }`
- `PUT /api/cart-items/:productId`
	- body: `{ "quantity": 2, "deliveryOptionId": "2" }`
- `DELETE /api/cart-items/:productId`

### Payment Summary

- `GET /api/payment-summary`

### Orders

- `GET /api/orders`
- `GET /api/orders?expand=products`
- `GET /api/orders/:orderId`
- `GET /api/orders/:orderId?expand=products`
- `POST /api/orders`

### Reset Seed Data

- `POST /api/reset`

## Static Assets

Backend serves product/rating/icon images from:

- `GET /images/...`

## Notes

- On server startup, backend seeds default products and delivery options only if those collections are empty.
- Frontend requests depend on `VITE_API_URL`. Ensure it points to your backend origin.
- In `frontend/vite.config.js`, `/api` and `/images` are proxied to `http://localhost:3000` during dev.

## Screenshots

- Home

	<img src="https://easycartreact.vercel.app/screenshots/s1.png" width="700" />

- Checkout

	<img src="https://easycartreact.vercel.app/screenshots/s2.png" width="700" />

- Orders

	<img src="https://easycartreact.vercel.app/screenshots/s3.png" width="700" />

- Tracking

	<img src="https://easycartreact.vercel.app/screenshots/s4.png" width="700" />
