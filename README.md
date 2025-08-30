# 🛒 Multivendor E-Commerce Platform

[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)  
[![Frontend](https://img.shields.io/badge/Frontend-React%2BVite-brightgreen)](https://vitejs.dev/)  
[![Backend](https://img.shields.io/badge/Backend-Node.js%2BExpress-yellow)](https://nodejs.org/)  
[![Socket.IO](https://img.shields.io/badge/Realtime-Socket.IO-blueviolet)](https://socket.io/)  
[![Database](https://img.shields.io/badge/Database-MongoDB-blueviolet)](https://www.mongodb.com/)  
[![Docker](https://img.shields.io/badge/Docker-Yes-blue)](https://www.docker.com/)  
[![Stripe](https://img.shields.io/badge/Payments-Stripe-blue)](https://stripe.com/)  
[![PayPal](https://img.shields.io/badge/Payments-PayPal-blue)](https://www.paypal.com/)

> A full-stack, Dockerized Multivendor E-Commerce platform with real-time features, integrated payments, and scalable architecture.

---

## 🚀 Features

- ✅ Multi-vendor support with product management
- ✅ User roles: Admin, Vendor, Customer
- ✅ Real-time updates for orders, chat, and notifications via **Socket.IO**
- ✅ Secure authentication with JWT
- ✅ Payment integration: **Stripe** & **PayPal**
- ✅ Responsive frontend (React + Vite)
- ✅ Dockerized for easy deployment
- ✅ Cloud-ready with MongoDB Atlas

---

## 🏗 Architecture Overview

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│  🌐 Frontend    │ ──────────────────► │  🖥 Backend     │
│  React + Vite   │                     │  Node.js        │
└─────────────────┘                     │  Express        │
         │                              └─────────────────┘
         │ WebSocket                             │
         │ Connection                           │ REST API
         ▼                                      ▼
┌─────────────────┐                     ┌─────────────────┐
│  📡 Socket.IO   │ ◄───────────────────│  🗄 MongoDB     │
│  Real-time      │   Real-time Events  │  Atlas          │
│  Server         │                     │  (Cloud DB)     │
└─────────────────┘                     └─────────────────┘
                                                 ▲
                                                 │
                           ┌─────────────────────┼─────────────────────┐
                           │                     │                     │
                           ▼                     ▼                     ▼
                  ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
                  │  💳 Stripe      │   │  💳 PayPal      │   │  🔐 JWT Auth    │
                  │  Payment        │   │  Payment        │   │  Security       │
                  │  Gateway        │   │  Gateway        │   │  Layer          │
                  └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Emoji Legend:

- 🌐 Frontend
- 🖥 Backend
- 📡 Socket.IO Server
- 🗄 Database
- ⚡ HTTP / Axios
- 🔔 Real-time / Socket.IO
- 💳 Payment Gateway

---

## 🛠 Tech Stack

| Layer            | Technology             |
| ---------------- | ---------------------- |
| Frontend         | React, Vite, Axios     |
| Backend          | Node.js, Express       |
| Realtime Server  | Node.js, Socket.IO     |
| Database         | MongoDB Atlas          |
| Payments         | Stripe, PayPal         |
| Containerization | Docker, Docker Compose |
| Deployment       | AWS EC2                |
| CI/CD            | GitHub Actions         |

---

## ⚡ Setup & Deployment

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/ash4477/multivendor-ecomm-proj.git
cd multivendor-ecomm-proj
```

2. Add .env files for frontend, backend, and socket services.

3. Build & run Docker containers:

```bash
docker compose up --build
```

4. Access the app locally:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Socket Server: ws://localhost:4000

### Deployment on EC2

1. Copy project to EC2 & open ports 3000, 4000, 5000.
2. Add .env files on the server.
3. Run Docker containers:

```bash
cd /home/ubuntu/ash/multivendor-ecomm-proj
docker compose up -d --build
```

### CI/CD with GitHub Actions

- Triggered on push to main.
- SSH into EC2, pull latest code, rebuild containers:

```bash
ssh -o StrictHostKeyChecking=no ubuntu@<EC2-IP> << 'EOF'
cd /home/ubuntu/ash/multivendor-ecomm-proj
git pull origin main
docker compose up -d --build
EOF
```

---

## 💳 Payment Integration

- **Stripe**: Credit/debit card transactions.
- **PayPal**: Alternative secure payment method.
- Integrated on both frontend and backend.

---

## 🎯 Case Study

### Scenario:

A startup needed a platform for multiple vendors to sell products online with real-time updates and integrated payments.

### Challenges:

- Real-time notifications for orders & chat
- Easy deployment & updates
- Secure, scalable backend

### Solution:

- Dockerized services (frontend, backend, socket)
- AWS EC2 hosting
- MongoDB Atlas for cloud storage
- GitHub Actions for CI/CD
- Stripe & PayPal payments

### Outcome:

- Vendors see instant order updates
- Quick deployment and updates
- Scalable and maintainable architecture

### Data Flow:

```
👤 User Actions
    ↓
🌐 Frontend (React)
    ↓ ← Real-time updates via Socket.IO
🖥 Backend (Node.js/Express)
    ↓ ← JWT Authentication
🗄 MongoDB Atlas
    ↓ ← Payment processing
💳 Stripe/PayPal
```

---

## 📈 Future Improvements

- Automated testing in CI/CD
- Logging & monitoring with Prometheus/Grafana
- Domain + SSL for production
- Analytics dashboard for vendors

---

## 🔗 Links

- **Repository**: https://github.com/ash4477/multivendor-ecomm-proj
- **Live Demo**: [Project Demo URL](http://54.147.135.163:3000/)
