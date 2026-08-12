# Abuzz Store - Portable Project Package

This folder contains the complete, self-contained source code for **Abuzz Store** (Next.js 16 + React 19 + Tailwind CSS v4 + Firebase + Cashfree Payment Gateway + Shiprocket).

---

## How to Run on Another Computer / System

### Prerequisites
- **Node.js**: v18.x, v20.x, or v22.x installed ([Download Node.js](https://nodejs.org/))
- **Git** (optional)

### Setup Steps
1. Copy this `abuzz_store_portable_project` folder to your new computer.
2. Open terminal/cmd inside this folder:
   ```bash
   cd abuzz_store_portable_project
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser at **http://localhost:3000**

---

## Key Configurations Included
- `.env.local`: Includes Real Firebase, Cashfree Payment Gateway, and Shiprocket credentials.
- `src/app/api/cashfree/create-order`: Server order creation endpoint.
- `src/app/api/cashfree/verify-order`: Payment status verification endpoint.
- `src/app/checkout/verify`: Post-payment return verification page.
- `public/sw.js`: Optimized Service Worker.
