/* File: src/pages/AdminFoods.jsx */
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';
import { AuthContext } from '../context/AuthContext';

// TODO: Thay bằng API thật của bạn
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminFoods() {
    const { token } = useContext(AuthContext);
    const [foods, setFoods] = useState([]);
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        inStock: '',
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
                    id: 1,
                    name: 'Milk',
                    price: 45000,
                    inStock: 20,
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
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name.trim(),
            price: Number(formData.price),
            inStock: Number(formData.inStock),
            image: formData.image.trim() || 'https://via.placeholder.com/400x300?text=No+Image',
        };

        if (!payload.name) {
            alert('Tên món ăn không được để trống!');
            return;
        }

        if (Number.isNaN(payload.price) || Number.isNaN(payload.inStock)) {
            alert('Giá và số lượng phải là số hợp lệ!');
            return;
        }

        try {
            setSaving(true);
            if (editingId) {
                // TODO: Thay bằng API thật của bạn (PUT /api/foods/{id})
                await axios.put(
                    `${API_BASE}/foods/${editingId}`,
                    { ...payload, id: editingId },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                console.log('Cap nhat mon an thanh cong!');
            } else {
                // TODO: Thay bằng API thật của bạn (POST /api/foods)
                await axios.post(`${API_BASE}/foods`, payload, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Them mon an moi thanh cong!');
            }

            resetForm();
        } catch (err) {
            console.error('Error saving food:', err);
            alert('Lỗi khi lưu dữ liệu!');
        } finally {
            setSaving(false);
            fetchFoods();
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa?')) return;

        try {
            // TODO: Thay bằng API thật của bạn (DELETE /api/foods/{id})
            await axios.delete(`${API_BASE}/foods/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('Xoa mon an thanh cong!');
            fetchFoods();
        } catch (err) {
            console.error('Error deleting food:', err);
            alert('Lỗi khi xóa dữ liệu!');
        }
    };

    const handleEdit = (food) => {
        setEditingId(food.id);
        setFormData({
            name: food.name,
            price: food.price,
          inStock: food.inStock,
            image: food.image,
        });
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingId(null);
        setFormData({
            name: '',
            price: '',
            inStock: '',
            image: '',
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
                                        name="name"
                                        value={formData.name}
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
                                        name="inStock"
                                        value={formData.inStock}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                        min="0"
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-2">
                                        Hình ảnh
                                    </label>
                                    <input
                                        type="text"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        placeholder="Nhập URL hình ảnh"
                                        required
                                        className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="bg-orange-500 text-white px-6 py-2 rounded font-bold hover:bg-orange-600 transition"
                                >
                                    {saving
                                        ? 'Đang lưu...'
                                        : editingId
                                          ? 'Cập Nhật'
                                          : 'Thêm Mới'}
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
                                key={food.id}
                                food={{
                                    ...food,
                                    foodId: food.id,
                                    foodName: food.name,
                                    quantity: food.inStock,
                                }}
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
