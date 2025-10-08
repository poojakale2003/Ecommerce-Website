# Ecommerce Website

A full-stack ecommerce platform built with React (Vite) for the client and Node.js/Express/MongoDB for the server. It supports user and admin roles, product management, shopping cart, checkout, PayPal integration, order management, address book, search, reviews, and more.

## Features

- User authentication (register/login)
- Product listing, filtering, and search
- Shopping cart and checkout flow
- Address management
- Order history and details
- PayPal payment integration
- Admin dashboard for products, orders, and features
- Responsive UI with modern design

## Tech Stack

- **Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Payment:** PayPal REST API
- **Image Upload:** Cloudinary
- **Other:** ESLint, Sonner (toast notifications)


## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB instance
- PayPal developer account (for sandbox credentials)
- Cloudinary account (for image uploads)

### Setup

#### 1. Clone the repository

```sh
git clone https://github.com/yourusername/ecommerce-project.git
cd ecommerce-project
```

### 2. Configure Environment Variables
Copy .env.template to .env in both client/ and server/ folders.
Fill in MongoDB URI, PayPal credentials, Cloudinary keys, and client/server URLs.

### 3. Install Dependencies

```sh
cd client
npm install
cd ../server
npm install
```

### 3. Run Development Servers
Client:

```sh
cd client
npm run dev
```
Server:
```sh
cd server
npm start
