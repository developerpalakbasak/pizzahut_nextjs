# 🍕 PizzaHut - Fullstack eCommerce Web App

**PizzaHut** is a fullstack eCommerce application built using **Next.js**, **Tailwind CSS**, and **MongoDB**. It features secure user authentication, role-based admin access, product management, and order auditing.

---

## 🚀 Features

### 🧑‍💻 Authentication

- Built with **NextAuth.js**
- Supports:
  - Google OAuth
  - GitHub OAuth
  - Credentials-based login (with `bcrypt` for hashing and `jsonwebtoken` for session handling)

### 🛒 Cart Functionality

- Cart is managed using `localStorage`
- Stored data: `productId`, `name`, and `quantity`
- **Price is not stored** for better security
- After placing an order, the cart is automatically emptied

### 📦 Product Management

- Admin dashboard includes:
  - Create new products (with image uploads via **Cloudinary**)
  - Delete existing products

### 📊 Order Management

- Admin dashboard shows:
  - **Pending orders**
  - **Completed orders**
- Admins can audit order status and track user purchases

### 🔐 Role-Based Access

- `middleware.js` restricts access based on user role
- Admin routes are protected and not accessible by regular users
- Logged-in users are redirected from the `/signin` route

---

## 🛠️ Tech Stack

| Technology       | Purpose                         |
| ---------------- | ------------------------------- |
| **Next.js**      | Fullstack React framework       |
| **Tailwind CSS** | Utility-first CSS framework     |
| **MongoDB**      | NoSQL database                  |
| **Mongoose**     | MongoDB ODM                     |
| **NextAuth.js**  | Authentication framework        |
| **bcrypt**       | Password hashing                |
| **jsonwebtoken** | Credential session handling     |
| **Cloudinary**   | Image upload and delivery       |
| **useContext**   | Global state management         |
| **localStorage** | Cart persistence in the browser |

---

## 📂 Folder Structure

<pre>
.
├── src/                               # All source code
│   ├── admin_components/              # Components used only in admin pages
│   ├── app/                           # Main Next.js App Router directory
│   │   ├── api/                       # Backend API routes
│   │   │   ├── auth/                  # Auth routes (NextAuth, credentials)
│   │   │   ├── get-prices/            # Fetch prices for cart items
│   │   │   ├── order/                 # Create and fetch orders
│   │   │   ├── pizza/                 # CRUD operations for products
│   │   │   └── user/                  # User registration and management
│   │   ├── admin/                     # Admin dashboard routes
│   │   │   ├── account/               # Admin profile page
│   │   │   ├── editproducts/          # Edit/delete existing products
│   │   │   ├── addproducts/           # Add new products
│   │   │   └── orders/                # View and manage orders
│   │   ├── about/                     # About page
│   │   ├── account/                   # User account/profile page
│   │   ├── cart/                      # Shopping cart page
│   │   ├── shop/                      # Product listing (shop) page
│   │   ├── signin/                    # Sign-in page
│   │   └── page.tsx                   # Homepage (root route)
│   │
│   ├── components/                    # Shared reusable UI components
│   ├── context/                       # React contexts (auth, cart, etc.)
│   ├── lib/                           # Utilities and configuration
│   │   ├── actions/                   # Server actions (e.g., signup, cart ops)
│   │   ├── config/                    # Config files (DB, auth, cloudinary)
│   │   ├── models/                    # Mongoose models (User, Product, Order)
│   │   └── wrapper/                   # Session wrapper (e.g., NextAuth)
│   │
│   └── middleware.js                  # Middleware to protect routes
│
├── public/                            # Static files (images, fonts, etc.)
│   └── temp/                          # Temporary storage for image uploads
│
├── .env.local                         # Local environment variables
├── next.config.mjs                    # Next.js configuration
├── tailwind.config.mjs                # Tailwind CSS configuration
└── README.md                          # Project documentation

</pre>

---

## 📄 Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB
MONGO_URI=mongodb://localhost:27017/pizzahat

# Bcrypt
SALT_ROUNDS=10

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Google OAuth
GOOGLE_ID=your_google_client_id
GOOGLE_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```
