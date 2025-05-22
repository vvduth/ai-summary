# AI Summary

AI Summary is a modern SAAS web application that lets you upload PDF files and receive concise, AI-generated summaries. Built with [Next.js](https://nextjs.org), it leverages the latest AI and cloud technologies for a seamless user experience.

## Live Demo

Check out the live app: [https://ai-summary-nu.vercel.app/](https://ai-summary-nu.vercel.app/)

## Features

- 🚀 Upload PDF files and get instant AI-powered summaries
- 📋 Save and manage your summaries in your dashboard
- 🔒 Secure authentication with Clerk
- 💳 Stripe integration for paid plans
- ⚡ Built with Next.js 15, React 19, Tailwind CSS, and more

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ai-summary.git
cd ai-summary
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add the following (replace with your actual keys):

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_API_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---