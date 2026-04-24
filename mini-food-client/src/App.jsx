/* File: src/App.jsx */
import { useContext } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Cart from './pages/Cart';
import AdminFoods from './pages/AdminFoods';
import MyOrders from './pages/MyOrders';
import Payment from './pages/Payment';

// Component bảo vệ route (Protected Route)
function ProtectedRoute({ children, requiredRole = null }) {
    const { user, role, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-gray-600">Đang tải...</p>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-gray-600">
                    Đang khởi tạo ứng dụng...
                </p>
            </div>
        );
    }

    return (
        <Router>
            <Navbar />
            <Routes>
                {/* Public Routes - Không đăng nhập */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" replace /> : <Register />}
                />

                {/* Public Route - Xem danh sách thực phẩm không cần đăng nhập */}
                <Route path="/" element={<Home />} />

                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/payment/:orderId"
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Routes - Chỉ ADMIN */}
                <Route
                    path="/admin-foods"
                    element={
                        <ProtectedRoute requiredRole="ADMIN">
                            <AdminFoods />
                        </ProtectedRoute>
                    }
                />

                {/* 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}
