# EasyStore 🛒

A complete full-stack ecommerce application built with React, Node.js, Express, Sequelize, and PostgreSQL. Features real-time cart management, delivery options, order creation, and live order tracking.

![EasyStore Banner](https://img.shields.io/badge/Status-Live-success) ![License](https://img.shields.io/badge/License-MIT-blue) ![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react) ![Node](https://img.shields.io/badge/Node.js-16+-339933?logo=node.js)

---

## 🌐 Live Demo

- **Frontend:** [https://easycartreact.vercel.app](https://easycartreact.vercel.app)
- **Backend API:** [https://easycart-u08y.onrender.com/api/products](https://easycart-u08y.onrender.com/api/products)

---

## 👨‍💻 Author

**Vedant Parashar**

- GitHub: [@vedantparasharr](https://github.com/vedantparasharr)
- LinkedIn: [vedantparasharr](https://www.linkedin.com/in/vedantparasharr)
- Email: iemavedant@gmail.com

---

## ✨ Features

- 🏠 **Home page** with complete product catalog
- 🛒 **Cart management** - add items, update quantities, remove products
- 🚚 **Multiple delivery options** for flexible shipping
- 💳 **Checkout page** with complete order summary
- 📦 **Order generation** and confirmation
- 📋 **Orders page** to view past purchases
- 📍 **Live delivery tracking** with animated progress bar
- 📱 **Fully responsive** mobile design
- 🗄️ **Real backend** with PostgreSQL database
- ☁️ **Production ready** and fully deployed

---

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP requests
- **Vercel** - Deployment platform

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **Sequelize ORM** - Database management
- **PostgreSQL** - Relational database (hosted on Render)
- **Render** - Backend deployment

---

## Screenshots

### Home Page
<img src="https://easycartreact.vercel.app/screenshots/s1.png" width="700" />

### Checkout Page
<img src="https://easycartreact.vercel.app/screenshots/s2.png" width="700" />

### Orders Page
<img src="https://easycartreact.vercel.app/screenshots/s3.png" width="700" />

### Tracking Page
<img src="https://easycartreact.vercel.app/screenshots/s4.png" width="700" />

---

## 📁 Project Structure

```
EasyCart/
├── backend/          # Express API & database logic
└── frontend/         # React application
```

---

## 🚀 Run Locally

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/vedantparasharr/EasyCart.git
cd EasyCart
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
DB_TYPE=postgres
RDS_HOSTNAME=your_render_hostname
RDS_USERNAME=your_username
RDS_PASSWORD=your_password
RDS_DB_NAME=your_db_name
RDS_PORT=5432
```

Start the development server:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=https://easycart-u08y.onrender.com
```

For local development, use:
```env
VITE_API_URL=http://localhost:5000
```

Start the development server:

```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

---

## 🌍 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Select the `frontend` folder as the root directory
3. Add environment variable: `VITE_API_URL`
4. Click **Deploy**

### Backend (Render)

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set root directory to `backend`
4. Add all environment variables from `.env`
5. Set start command: `node server.js`
6. Click **Deploy**

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vedantparasharr/EasyCart/issues).

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on [GitHub](https://github.com/vedantparasharr/EasyCart)!

---

**Made with ❤️ by Vedant Parashar**
