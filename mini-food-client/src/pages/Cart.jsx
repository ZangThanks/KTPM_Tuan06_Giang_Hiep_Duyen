/* File: src/pages/Cart.jsx */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import { CircleCheck, Hourglass } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Cart() {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext);
  const { user, token } = useContext(AuthContext);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const totalPrice = getTotalPrice();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm món ăn trước.");
      return;
    }

    if (!user?.id && !user?.userId) {
      alert("Vui lòng đăng nhập trước khi đặt hàng.");
      return;
    }

    setLoading(true);

    try {
      // Tạo order theo format yêu cầu
      const orderData = {
        id: Math.floor(Math.random() * 1000000),
        userId: user?.id || user?.userId,
        totalAmount: totalPrice,
        orderDate: new Date().toISOString(),
        orderDetails: cart.map((item) => ({
          foodId: item.foodId,
          quantity: item.quantity,
          price: item.price || 0,
          lineTotal: (item.price || 0) * item.quantity,
        })),
      };

      const response = await axios.post(`${API_BASE}/orders`, orderData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Đặt hàng thành công!", response.data);
      console.log("Thông tin đơn hàng:", {
        orderId: response.data?.id || orderData.id,
        userId: user?.id || user?.userId,
        totalAmount: totalPrice,
        itemCount: cart.length,
        items: cart,
      });

      alert(`Đặt hàng thành công!`);
      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert(`Lỗi đặt hàng: ${err.response?.data?.message || err.message}`);

      if (err.response?.status === 404 || err.code === "ECONNREFUSED") {
        console.log("Dùng order giả lập (demo mode)");
        console.log("Đặt hàng thành công (Demo)!", {
          orderId: Math.floor(Math.random() * 1000000),
          userId: user?.id || user?.userId,
          totalAmount: totalPrice,
          orderDetails: cart.map((item) => ({
            foodId: item.foodId,
            quantity: item.quantity,
            price: item.price,
            lineTotal: (item.price || 0) * item.quantity,
          })),
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center flex flex-col items-center bg-white rounded-lg shadow-md p-10">
          <div className="text-6xl mb-2 flex items-center justify-center">
            <CircleCheck className="text-green-600 size-10" />
          </div>
          <h1 className="text-4xl font-bold text-green-600 mb-2">
            Đặt Hàng Thành Công!
          </h1>
          <div className="text-gray-600 mb-2 flex items-center gap-2">
            <Hourglass className="size-4 animate-spin text-yellow-400" />
            Cảm ơn bạn đã đặt hàng. Chuyển hướng...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🛒 Giỏ Hàng</h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-2xl text-gray-600 mb-4">
              Giỏ hàng của bạn trống
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition"
            >
              Tiếp Tục Đặt Hàng
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-3 space-y-4">
              {cart.map((item) => (
                <CartItem key={item.foodId} item={item} />
              ))}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Tóm Tắt Đơn Hàng
                </h2>

                {/* Chi tiết giá */}
                <div className="space-y-3 mb-6 border-b pb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Số lượng món:</span>
                    <span className="font-semibold">{cart.length}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tổng số lượng:</span>
                    <span className="font-semibold">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)}
                    </span>
                  </div>
                </div>

                {/* Tổng tiền */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-gray-800">
                      Tổng Tiền:
                    </span>
                    <span className="text-2xl font-bold text-orange-500">
                      {totalPrice?.toLocaleString("vi-VN")} ₫
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Đã bao gồm tất cả phí</p>
                </div>

                {/* Phương thức thanh toán */}
                <div className="mb-6 border-t pt-6">
                  <label className="block text-gray-700 font-semibold mb-3">
                    Phương Thức Thanh Toán
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={paymentMethod === "COD"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Thanh Toán Khi Nhận (COD)
                      </span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="Banking"
                        checked={paymentMethod === "Banking"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-orange-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Chuyển Khoản Ngân Hàng
                      </span>
                    </label>
                  </div>
                </div>

                {/* Nút đặt hàng */}
                <button
                  onClick={handleCheckout}
                  disabled={loading || cart.length === 0}
                  className="w-full bg-orange-500 text-white font-bold py-3 rounded hover:bg-orange-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? "Đang xử lý..." : "Đặt Hàng"}
                </button>

                {/* Nút tiếp tục đặt hàng */}
                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-gray-300 text-gray-700 font-bold py-2 rounded mt-3 hover:bg-gray-50 transition"
                >
                  ← Tiếp Tục Đặt Hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
