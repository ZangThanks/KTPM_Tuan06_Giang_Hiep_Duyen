/* File: src/pages/AdminFoods.jsx */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import { AuthContext } from '../context/AuthContext';

// TODO: Thay bằng API thật của bạn
const API_BASE = 'http://localhost:8080/api';

export default function AdminFoods() {
    const { token } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        foodName: '',
        description: '',
        price: '',
        quantity: '',
        image: '🍔',
    });

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            // TODO: Thay bằng API thật của bạn
            const response = await axios.get(`${API_BASE}/foods`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFoods(response.data || []);
        } catch (err) {
            console.error('Error fetching foods:', err);
            // Dữ liệu mẫu cho demo
            setFoods([
                {
                    foodId: 1,
                    foodName: 'Cơm Gà Hainanese',
                    description: 'Cơm gà nấu theo cách Hainanese',
                    price: 45000,
                    quantity: 20,
                    image: '🍚',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                name === 'price' || name === 'quantity'
                    ? parseInt(value) || 0
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            foodName: formData.foodName,
            description: formData.description,
            price: formData.price,
            quantity: formData.quantity,
            image: formData.image,
        };

        try {
            if (editingId) {
                // TODO: Thay bằng API thật của bạn (PUT /api/foods/{id})
                await axios.put(`${API_BASE}/foods/${editingId}`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('✅ Cập nhật món ăn thành công!');
            } else {
                // TODO: Thay bằng API thật của bạn (POST /api/foods)
                await axios.post(`${API_BASE}/foods`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('✅ Thêm món ăn mới thành công!');
            }

            // Cập nhật giả lập (demo)
            if (editingId) {
                setFoods(
                    foods.map((f) =>
                        f.foodId === editingId ? { ...f, ...payload } : f,
                    ),
                );
            } else {
                setFoods([...foods, { foodId: Date.now(), ...payload }]);
            }

            resetForm();
            fetchFoods();
        } catch (err) {
            console.error('Error saving food:', err);
            alert('Lỗi khi lưu dữ liệu!');
        }
    };

    const handleDelete = async (foodId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;

        try {
            // TODO: Thay bằng API thật của bạn (DELETE /api/foods/{id})
            await axios.delete(`${API_BASE}/foods/${foodId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('✅ Xóa món ăn thành công!');
            setFoods(foods.filter((f) => f.foodId !== foodId));
        } catch (err) {
            console.error('Error deleting food:', err);
            alert('Lỗi khi xóa dữ liệu!');
        }
    };

    const handleEdit = (food) => {
        setEditingId(food.foodId);
        setFormData({
            foodName: food.foodName,
            description: food.description,
            price: food.price,
            quantity: food.quantity,
            image: food.image || '🍔',
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            foodName: '',
            description: '',
            price: '',
            quantity: '',
            image: '🍔',
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-2xl text-gray-600">Đang tải dữ liệu...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">
                        ⚙️ Quản Lý Món Ăn
                    </h1>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="bg-green-500 text-white px-6 py-2 rounded font-bold hover:bg-green-600 transition"
                    >
                        + Thêm Món Ăn
                    </button>
                </div>

                {/* Form thêm/sửa */}
                {showForm && (
                    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            {editingId ? 'Sửa Món Ăn' : 'Thêm Món Ăn Mới'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Tên món */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Tên Món
                                    </label>
                                    <input
                                        type="text"
                                        name="foodName"
                                        value={formData.foodName}
                                        onChange={handleInputChange}
                                        placeholder="Nhập tên món ăn"
                                        required
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                {/* Giá */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Giá (₫)
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                        min="0"
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                {/* Số lượng */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Số Lượng
                                    </label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                        min="0"
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                    />
                                </div>

                                {/* Icon */}
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Icon Emoji
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        maxLength="2"
                                        placeholder="🍔"
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500 text-2xl text-center"
                                    />
                                </div>
                            </div>

                            {/* Mô tả */}
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">
                                    Mô Tả
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Nhập mô tả món ăn"
                                    rows="3"
                                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition"
                                >
                                    {editingId ? 'Cập Nhật' : 'Thêm Mới'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="bg-gray-400 text-white px-6 py-2 rounded font-bold hover:bg-gray-500 transition"
                                >
                                    Hủy
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Danh sách thực phẩm */}
                {foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <FoodCard
                                key={food.foodId}
                                food={food}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isAdmin={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-xl text-gray-600">
                            Không có món ăn nào
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
