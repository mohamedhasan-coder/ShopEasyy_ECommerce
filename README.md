# ShopEasyy – Full Stack E-Commerce Application

A full-stack e-commerce web application built with the MERN stack.

## Technology Stack

Frontend:
- React.js
- Redux Toolkit
- React Router

Backend:
- Node.js
- Express.js

Database:
- MongoDB (Mongoose ODM)

Authentication:
- JWT
- bcryptjs

Payments:
- Razorpay

Email:
- Nodemailer (Gmail / SMTP)

File Upload:
- Cloudinary

API Testing:
- Postman

Styling:
- Tailwind CSS

## Software & Tools Used

- Visual Studio Code (VS Code)
- Node.js
- MongoDB
- MongoDB Compass
- Postman
- Google Chrome
- Cloudinary
- Razorpay Dashboard
- Gmail SMTP

## Key Features

User Authentication:
- JWT based login and signup
- Password hashing
- Protected routes

Product Management:
- Add, edit, delete and view products
- Image upload support

Shopping Cart & Checkout:
- Redux Toolkit cart state
- Payment integration

Order Management:
- Order history
- Order status tracking

Admin Dashboard:
- Manage users, products and orders

## Project Structure

ShopEasyy_ECommerce/
- backend/
  - config/
  - controller/
  - helper/
  - middleware/
  - models/
  - routes/
  - server.js
  - app.js

- frontend/
  - src/
    - assets/
    - components/
    - features/
    - pages/
    - store.js
    - main.jsx
    - App.jsx
  - public/
  - package.json

## Installation & Setup

1. Clone the repository

git clone https://github.com/your-username/shopeasyy-ecommerce.git  
cd shopeasyy-ecommerce  

2. Backend setup

cd backend  
npm install  
npm run dev  

3. Frontend setup

cd frontend  
npm install  
npm run dev  

## API Endpoints

POST /api/auth/register  
POST /api/auth/login  
GET /api/products  
POST /api/products  
POST /api/orders  

## Screenshots

Add screenshots here.

## Future Enhancements

- Wishlist
- Product reviews
- Role-based access
- Real-time order tracking

## Author

Hasan Techy

## License

MIT License
