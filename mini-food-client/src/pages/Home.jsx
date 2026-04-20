/* File: src/pages/Home.jsx */
import { useState, useEffect } from 'react';
import axios from 'axios';
import FoodCard from '../components/FoodCard';

// TODO: Thay bằng API thật của bạn
const API_BASE = 'http://localhost:8080/api';

export default function Home() {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            // TODO: Thay bằng API thật của bạn (GET /api/foods hoặc /api/foods/list)
            const response = await axios.get(`${API_BASE}/foods`);
            setFoods(response.data || []);
        } catch (err) {
            console.error('Error fetching foods:', err);
            setError('Không thể tải danh sách món ăn');
            // Dữ liệu mẫu cho demo
            setFoods(generateSampleFoods());
        } finally {
            setLoading(false);
        }
    };

    const generateSampleFoods = () => [
        {
            foodId: 1,
            foodName: 'Cơm Gà Hainanese',
            description:
                'Cơm gà nấu theo cách Hainanese truyền thống, mềm mẫn và thơm ngon',
            price: 45000,
            quantity: 20,
            image: '🍚',
        },
        {
            foodId: 2,
            foodName: 'Bánh Mì Thịt Nướng',
            description: 'Bánh mì giòn với thịt nướng thơm, đầy đủ rau gia vị',
            price: 25000,
            quantity: 25,
            image: '🥖',
        },
        {
            foodId: 3,
            foodName: 'Phở Bò',
            description:
                'Phở bò nước dùng ngon, noodles mềm, thịt bò tuyệt vời',
            price: 35000,
            quantity: 15,
            image: '🍜',
        },
        {
            foodId: 4,
            foodName: 'Gà Rán KFC Style',
            description: 'Gà rán giòn ngoài, mềm trong, ướp ánh vàng',
            price: 55000,
            quantity: 30,
            image: '🍗',
        },
        {
            foodId: 5,
            foodName: 'Bún Chả Hà Nội',
            description: 'Bún chả với nước mắm đặc trưng, thịt nướng mọng mềm',
            price: 40000,
            quantity: 18,
            image: '🍝',
        },
        {
            foodId: 6,
            foodName: 'Cá Rán Miền Nam',
            description: 'Cá rán giòn vàng, ăn kèm với nước mắm chua ngọt',
            price: 50000,
            quantity: 12,
            image: '🐟',
        },
    ];

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
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">
                        🍔 Danh Sách Món Ăn
                    </h1>
                    <p className="text-gray-600">
                        Chọn những món ăn yêu thích của bạn
                    </p>
                </div>

                {error && (
                    <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
                        ⚠️ {error} - Hiển thị dữ liệu mẫu
                    </div>
                )}

                {/* Grid Thực phẩm */}
                {foods.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {foods.map((food) => (
                            <FoodCard key={food.foodId} food={food} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-xl text-gray-600">
                            Không có món ăn nào
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
