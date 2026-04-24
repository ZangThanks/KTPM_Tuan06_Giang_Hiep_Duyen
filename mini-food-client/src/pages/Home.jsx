import { useState, useEffect } from "react";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import { Hamburger, Bell, Hourglass } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${API_BASE}/foods`);
      setFoods(response.data || []);
    } catch (err) {
      console.error("Error fetching foods:", err);
      setError("Không thể tải danh sách món ăn");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">
          <Hourglass className="size-4 animate-spin text-yellow-400" />
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
            <Hamburger className="size-9" /> Danh Sách Món Ăn
          </h1>
          <p className="text-gray-600">Chọn những món ăn yêu thích của bạn</p>
        </div>

        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-6">
            {error} - Hiển thị dữ liệu mẫu
          </div>
        )}

        {/* Grid Thực phẩm */}
        {foods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Không có món ăn nào</p>
          </div>
        )}
      </div>
    </div>
  );
}
