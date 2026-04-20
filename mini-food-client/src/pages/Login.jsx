/* File: src/pages/Login.jsx */
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

// TODO: Thay bằng API thật của bạn
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE}/users/login`, {
                username,
                password,
            });

            const { token } = response.data || {};

            if (!token) {
                throw new Error('Login response does not contain token');
            }

            const userResponse = await axios.get(`${API_BASE}/users/username`, {
                params: { username },
                headers: { Authorization: `Bearer ${token}` },
            });

            login(userResponse.data, token, userResponse.data?.role);
            navigate('/');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Đăng nhập thất bại. Kiểm tra lại thông tin.',
            );
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center text-orange-500 mb-2">
                    🍔 Mini Food
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Hệ thống đặt món ăn nội bộ
                </p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Tên đăng nhập */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Tên Đăng Nhập
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Nhập tên đăng nhập"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Mật Khẩu
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Nhập mật khẩu"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Nút đăng nhập */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Nhập'}
                    </button>
                </form>

                {/* Link đăng ký */}
                <p className="text-center text-gray-600 mt-6">
                    Chưa có tài khoản?{' '}
                    <Link
                        to="/register"
                        className="text-orange-500 font-semibold hover:underline"
                    >
                        Đăng Ký Ngay
                    </Link>
                </p>
            </div>
        </div>
    );
}
