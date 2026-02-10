# Shopping Cart – Fullstack Assignment

A full‑stack shopping cart application that implements the flow:

> **User → Add Items to Cart → Order with Items in the Cart → Done!**[file:1]

The project follows the assignment requirements with:

- User signup and login with **single‑device session** using JWT stored in the user record.[file:1]
- Cart management per user (only one active cart per user).[file:1]
- Order placement from the cart.
- React frontend with login, items list, cart, checkout, order history, and a per‑user dashboard.

---

## Tech Stack

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- bcryptjs
- dotenv
- cors

### Frontend

- React (Vite)
- React Router
- Tailwind CSS
- Axios

---

## Project Structure

```bash
shopping-cart-app/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Item.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── itemRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── userStatsRoutes.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── .env (not committed)
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── components/
│   │   │   ├── Login.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ItemList.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── OrdersPage.jsx
│   │   │   └── UserDashboard.jsx
│   │   └── index.css
│   ├── tailwind.config.cjs
│   └── postcss.config.cjs
└── README.md
