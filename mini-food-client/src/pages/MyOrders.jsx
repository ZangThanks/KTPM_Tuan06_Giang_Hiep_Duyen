/* File: src/pages/MyOrders.jsx */
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Hourglass, List, Receipt } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export default function MyOrders() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/orders/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            setError("Token hết hạn. Vui lòng đăng nhập lại.");
          } else if (response.status === 403) {
            setError("Bạn không có quyền xem đơn hàng.");
          } else {
            setError("Lỗi khi tải đơn hàng: " + response.statusText);
          }
          return;
        }

        const data = await response.json();
        setOrders(data || []);
      } catch (err) {
        setError("Lỗi kết nối: " + (err.message || "Không thể tải đơn hàng"));
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600">⏳ Đang tải đơn hàng...</p>
      </div>
    );
  }

  console.log("My order: ", orders);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 flex items-center gap-3">
          <Receipt className="size-9" /> Đơn Hàng Của Tôi
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {!error && orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-2xl text-gray-500 mb-4">
              Bạn chưa có đơn hàng nào
            </p>
            <a
              href="/"
              className="text-orange-500 hover:text-orange-600 font-semibold"
            >
              Quay lại mua hàng
            </a>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition p-6"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Đơn hàng #{order.id}
                    </h3>
                    {/* <div className="text-sm text-gray-500 mt-1">
                      <div className="font-medium text-gray-700">Chi tiết:</div>
                      <div className="flex gap-3 flex-wrap mt-1">
                        {order.orderDetails && order.orderDetails.length > 0 ? (
                          order.orderDetails.map((detail, idx) => (
                            <span
                              key={idx}
                              className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs"
                            >
                              Mục {idx + 1}: Mã {detail.foodId} ×{" "}
                              {detail.quantity}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-400">
                            Không có chi tiết
                          </span>
                        )}
                      </div>
                    </div> */}
                  </div>
                  <div className="text-right flex items-center gap-3 justify-center">
                    <div className="text-2xl font-bold text-orange-500">
                      {Number(order.totalAmount || 0).toLocaleString("vi-VN")}đ
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "COMPLETED"
                          ? "bg-green-100 text-green-800"
                          : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status || "PENDING"}
                    </span>
                  </div>
                </div>

                {/* Order Items */}
                {order.orderDetails && order.orderDetails.length > 0 && (
                  <div className="border-t pt-3 mt-2">
                    <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <List className="size-4 text-orange-400" /> Chi tiết các
                      mục:
                    </h4>
                    <div className="space-y-2">
                      {order.orderDetails.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded"
                        >
                          <div>
                            <span className="font-medium">Mục {idx + 1}:</span>{" "}
                            Mã sản phẩm {item.foodId}
                          </div>
                          <div className="text-right">
                            <div>Số lượng: {item.quantity}</div>
                            <div className="font-medium text-orange-600">
                              {Number(item.lineTotal || 0).toLocaleString(
                                "vi-VN",
                              )}
                              đ
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Order Metadata */}
                <div className="border-t pt-4 mt-4 text-xs text-gray-500 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {order.orderDate && (
                      <p>
                        Ngày tạo:{" "}
                        {new Date(order.orderDate).toLocaleString("vi-VN")}
                      </p>
                    )}
                    {order.updatedAt && (
                      <p>
                        Cập nhật lần cuối:{" "}
                        {new Date(order.updatedAt).toLocaleString("vi-VN")}
                      </p>
                    )}
                  </div>
                  {order.status === "PENDING" && (
                    <button
                      onClick={() => navigate(`/payment/${order.id}`)}
                      className="bg-blue-500 text-white px-4 py-3 rounded font-medium hover:bg-blue-600 transition text-[18px]"
                    >
                      Thanh toán
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
