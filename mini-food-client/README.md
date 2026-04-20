#!/bin/bash

# File: README.md (Project Setup Guide)

# Mini Food - Hệ Thống Đặt Món Ăn Nội Bộ

Đây là một ứng dụng web hiện đại cho phép nhân viên công ty đặt và quản lý các món ăn nội bộ.

## 🎯 Tính Năng

✅ Đăng ký / Đăng nhập người dùng
✅ Danh sách món ăn (grid layout)
✅ Giỏ hàng (thêm, sửa, xóa)
✅ Đặt hàng + Thanh toán (COD/Banking)
✅ Quản lý món ăn (Admin)
✅ Role-based access control (USER/ADMIN)
✅ Lưu trữ local (token, cart, user info)

## 🛠️ Tech Stack

**Frontend:**

- React 18.2.0
- React Router v6.10.0
- Axios (HTTP client)
- Context API (State management)
- Tailwind CSS (Styling)

**Backend:**

- Service-Based Architecture
- 5 Spring Boot Microservices
- PostgreSQL Database
- Docker & Docker Compose

## 📁 Cấu Trúc Project

```
Mini_Food_Client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Thanh điều hướng
│   │   ├── FoodCard.jsx       # Card món ăn
│   │   └── CartItem.jsx       # Item giỏ hàng
│   ├── pages/
│   │   ├── Login.jsx          # Trang đăng nhập
│   │   ├── Register.jsx       # Trang đăng ký
│   │   ├── Home.jsx           # Trang chủ (danh sách món)
│   │   ├── Cart.jsx           # Trang giỏ hàng
│   │   └── AdminFoods.jsx     # Quản lý món ăn (Admin)
│   ├── context/
│   │   ├── AuthContext.jsx    # Context xác thực
│   │   └── CartContext.jsx    # Context giỏ hàng
│   ├── App.jsx                # Main app component
│   ├── main.jsx               # Entry point
│   └── index.css              # Styles
├── index.html                 # HTML chính
├── package.json               # Dependencies
├── vite.config.js             # Vite config
├── tailwind.config.js         # Tailwind config
├── postcss.config.js          # PostCSS config
└── Dockerfile                 # Docker image

docker-compose.yaml            # Docker Compose (tại thư mục gốc)
```

## 🚀 Cài Đặt & Chạy

### 1. Cài đặt Frontend

```bash
cd Mini_Food_Client
npm install
```

### 2. Chạy Development Server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: http://localhost:3000

### 3. Build Production

```bash
npm run build
```

## 🐳 Docker Deployment

### Cấu trúc Docker Compose

File `docker-compose.yaml` tại thư mục gốc chứa:

- **frontend** (port 3000): React app via Nginx
- **api-gateway** (port 8080): Spring Boot API Gateway
- **auth-service** (port 8081): Xác thực & User management
- **food-service** (port 8082): Quản lý thực phẩm
- **order-service** (port 8083): Quản lý đơn hàng
- **notification-service** (port 8084): Thông báo
- **db** (port 5432): PostgreSQL Database

### Chạy Docker Compose

```bash
# Tại thư mục gốc (cùng cấp với Mini_Food_Client)
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng service
docker-compose down

# Xóa volumes (cảnh báo: mất data)
docker-compose down -v
```

## 🔐 Xác Thực & Token

**Login:**

- POST `/api/auth/login`
- Body: `{ username, password }`
- Response: `{ token, user, role }`

**Register:**

- POST `/api/auth/register`
- Body: `{ username, email, password, fullName }`

**Token storage:**

- localStorage: `token`, `user`, `role`

## 🍔 API Endpoints

### Auth Service (8081)

- `POST /api/auth/register` - Đăng ký
- `POST /api/auth/login` - Đăng nhập

### Food Service (8082)

- `GET /api/foods` - Danh sách thực phẩm
- `POST /api/foods` - Thêm thực phẩm (Admin)
- `PUT /api/foods/{id}` - Sửa thực phẩm (Admin)
- `DELETE /api/foods/{id}` - Xóa thực phẩm (Admin)

### Order Service (8083)

- `POST /api/orders` - Tạo đơn hàng
- `GET /api/orders` - Danh sách đơn hàng
- `GET /api/orders/{id}` - Chi tiết đơn hàng

## 📝 Thông Tin Tài Khoản Demo

```
Username: admin
Password: admin123
Role: ADMIN

Username: user1
Password: user123
Role: USER
```

## 🎨 Giao Diện

- **Navbar**: Logo, navigation links, user info, logout button
- **Home**: Grid danh sách món ăn, card design
- **Cart**: Danh sách items, cập nhật số lượng, thanh toán
- **Admin**: Form thêm/sửa, danh sách quản lý
- **Auth**: Login & Register forms

## 🔧 Cấu Hình API Base URL

File: `src/pages/*`

```javascript
// TODO: Thay bằng API thật của bạn
const API_BASE = 'http://localhost:8080/api';
```

Thay đổi thành URL API thực tế khi deploy.

## 📱 Responsive Design

Ứng dụng sử dụng Tailwind CSS breakpoints:

- Mobile: xs (< 640px)
- Tablet: md (768px)
- Desktop: lg (1024px)

## 🛡️ Role-Based Access

- **USER**: Xem danh sách, đặt hàng, xem giỏ
- **ADMIN**: + Quản lý món ăn, thêm/sửa/xóa

## 📌 TODO Items

Những điểm cần thực hiện:

1. ✅ Frontend React hoàn chỉnh
2. ✅ Context API (Auth + Cart)
3. ✅ Protected Routes
4. ✅ Tailwind CSS
5. ⏳ Backend Spring Boot (5 services)
6. ⏳ Database schema
7. ⏳ API implementation
8. ⏳ Docker images

## 🐛 Troubleshooting

**Port đã được sử dụng:**

```bash
# Tìm process sử dụng port
lsof -i :3000

# Hoặc thay đổi port trong vite.config.js
```

**Clear cache:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**Build lỗi:**

```bash
npm run build -- --debug
```

## 📞 Contact & Support

Để hỗ trợ thêm, vui lòng liên hệ team development.

---

**Created**: 2026
**Version**: 1.0.0
**Status**: Development ✨
