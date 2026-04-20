/* File: src/components/FoodCard.jsx */
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

export default function FoodCard({ food, onEdit, onDelete, isAdmin = false }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(food);
    alert(`${food.name} đã được thêm vào giỏ hàng!`);
  };

  return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          {/* Hình ảnh */}
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-4xl overflow-hidden">
              <img src={food.image} alt={food.name} className="w-full h-full object-cover" />
          </div>

          {/* Nội dung */}
          <div className="p-4">
              <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">
                  {food.name}
              </h3>

              {/* Giá */}
              <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-orange-500">
                      {food.price?.toLocaleString('vi-VN')} ₫
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      Còn lại: {food.inStock || 0}
                  </span>
              </div>

              {/* Buttons */}
              {!isAdmin ? (
                  <button
                      onClick={handleAddToCart}
                      disabled={food.inStock <= 0}
                      className="w-full bg-orange-500 text-white py-2 rounded font-medium hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                      {food.inStock > 0 ? 'Thêm Vào Giỏ' : 'Hết Hàng'}
                  </button>
              ) : (
                  <div className="flex gap-2">
                      <button
                          onClick={() => onEdit(food)}
                          className="flex-1 bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-600 transition text-sm"
                      >
                          Sửa
                      </button>
                      <button
                          onClick={() => onDelete(food.foodId)}
                          className="flex-1 bg-red-500 text-white py-2 rounded font-medium hover:bg-red-600 transition text-sm"
                      >
                          Xóa
                      </button>
                  </div>
              )}
          </div>
      </div>
  );
}
