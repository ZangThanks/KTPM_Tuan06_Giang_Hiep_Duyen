/* File: src/pages/Register.jsx */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// TODO: Thay bằng API thật của bạn
const API_BASE = 'http://localhost:8080/api';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp!');
            return;
        }

        setLoading(true);

        try {
            // TODO: Thay bằng API thật của bạn
            await axios.post(`${API_BASE}/auth/register`, {
                username,
                email,
                password,
                fullName,
            });

            setSuccess(
                'Đăng ký thành công! Chuyển hướng đến trang đăng nhập...',
            );
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    'Đăng ký thất bại. Vui lòng thử lại.',
            );
            console.error('Register error:', err);
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
                    Tạo tài khoản mới
                </p>

                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Họ tên */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Họ Tên
                        </label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Nhập họ tên"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                    </div>

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

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Nhập email"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Mật khẩu */}
                    <div className="mb-4">
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

                    {/* Xác nhận mật khẩu */}
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">
                            Xác Nhận Mật Khẩu
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Nhập lại mật khẩu"
                            required
                            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                        />
                    </div>

                    {/* Nút đăng ký */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded hover:bg-orange-600 transition disabled:bg-gray-400"
                    >
                        {loading ? 'Đang xử lý...' : 'Đăng Ký'}
                    </button>
                </form>

                {/* Link đăng nhập */}
                <p className="text-center text-gray-600 mt-6">
                    Đã có tài khoản?{' '}
                    <Link
                        to="/login"
                        className="text-orange-500 font-semibold hover:underline"
                    >
                        Đăng Nhập
                    </Link>
                </p>
            </div>
        </div>
    );
}
