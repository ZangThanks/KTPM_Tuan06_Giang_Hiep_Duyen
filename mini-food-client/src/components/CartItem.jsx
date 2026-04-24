/* File: src/components/CartItem.jsx */
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  const handleIncrease = () => {
    updateQuantity(item.foodId, item.quantity + 1);
  };

  const handleDecrease = () => {
    updateQuantity(item.foodId, item.quantity - 1);
  };

  const handleRemove = () => {
    removeFromCart(item.foodId);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between gap-4">
      {/* Hình ảnh và tên */}
      <div className="flex items-center gap-4 flex-1">
        <img
          src={item.image}
          width={80}
          className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-2xl"
        />
        <div>
          <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
          <p className="text-orange-500 font-semibold">
            {item.price?.toLocaleString("vi-VN")} ₫
          </p>
        </div>
      </div>

      {/* Số lượng */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded font-bold hover:bg-gray-400 transition"
        >
          −
        </button>
        <span className="w-8 text-center font-bold">{item.quantity}</span>
        <button
          onClick={handleIncrease}
          className="bg-gray-300 text-gray-800 px-3 py-1 rounded font-bold hover:bg-gray-400 transition"
        >
          +
        </button>
      </div>

      {/* Tổng tiền */}
      <div className="text-right">
        <p className="text-lg font-bold text-orange-500">
          {itemTotal?.toLocaleString("vi-VN")} ₫
        </p>
      </div>

      {/* Nút xóa */}
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded font-medium hover:bg-red-600 transition"
      >
        Xóa
      </button>
    </div>
  );
}
