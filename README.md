# 🛒 MJ-Store  
### Full Stack MERN eCommerce Application with Braintree & COD Payments

MJ-Store is a full-stack eCommerce web application built using the MERN stack (MongoDB, Express, React, Node.js).  
It includes secure authentication, role-based authorization, product management, and integrated payment gateway support.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Browse Products
- Filter by Category & Price
- Add to Cart
- Place Orders
- Payment Methods:
  - 💳 Braintree Card Payment
  - 🚚 Cash on Delivery (COD)
- View Order History
- User Dashboard

### 🔐 Admin Features
- Admin Dashboard
- Create / Update / Delete Products
- Manage Categories
- Manage Orders
- Update Order Status

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Context API
- Axios
- Bootstrap / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Braintree Payment Gateway

---

## 📂 Project Structure

mj-store/
│
├── client/                 # React Frontend
├── controllers/            # Business Logic
├── models/                 # Database Models
├── routes/                 # API Routes
├── middlewares/            # Authentication Middleware
├── config/                 # Database & Payment Config
├── server.js               # Main Server File
└── package.json

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

PORT=8000  
MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  

BRAINTREE_MERCHANT_ID=your_merchant_id  
BRAINTREE_PUBLIC_KEY=your_public_key  
BRAINTREE_PRIVATE_KEY=your_private_key  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

git clone https://github.com/your-username/mj-store.git  
cd mj-store  

### 2️⃣ Install Backend Dependencies

npm install  

### 3️⃣ Install Frontend Dependencies

cd client  
npm install  

### 4️⃣ Run the Application

Run backend + frontend together:

npm run dev  

OR run separately:

npm start  
cd client  
npm start  

---

## 💳 Payment Integration

This project supports:

- Secure Card Payment via Braintree
- Cash on Delivery (COD)
- Order storage in MongoDB
- Admin order status management

---

## 🔒 Security Features

- Password Hashing
- JWT Authentication
- Role-based Access Control
- Protected Routes (Admin & User)
- Secure Payment Handling

---

## 📈 Future Improvements

- Razorpay Integration
- Product Reviews & Ratings
- Wishlist Feature
- Email Notifications
- Order Tracking System
- Deployment (Render / Vercel)

---

## 👨‍💻 Author

Manjeet Gupta  
IIT Patna  
MERN Stack Developer  

---

## 📜 License

This project is licensed under the MIT License.
