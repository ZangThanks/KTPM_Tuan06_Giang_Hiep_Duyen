import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CreditCard, CheckCircle, AlertCircle, Hourglass } from "lucide-react";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export default function Payment() {
  const { token } = useContext(AuthContext);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form data
  const [formData, setFormData] = useState({
    cardholderName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "CREDIT_CARD",
  });

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE}/orders/me/${orderId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Không thể tải thông tin đơn hàng");
        }

        const data = await response.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching order:", err);
      } finally {
        setLoading(false);
      }
    };

    if (token && orderId) {
      fetchOrder();
    }
  }, [token, orderId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Format card number (remove spaces and limit to 16 digits)
    if (name === "cardNumber") {
      const cleaned = value.replace(/\s/g, "").slice(0, 16);
      const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
      setFormData({ ...formData, [name]: formatted });
      return;
    }

    // Format expiry date (MM/YY)
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      if (cleaned.length >= 2) {
        const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
        setFormData({ ...formData, [name]: formatted });
      } else {
        setFormData({ ...formData, [name]: cleaned });
      }
      return;
    }

    // Limit CVV to 3-4 digits
    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setFormData({ ...formData, [name]: cleaned });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const { cardholderName, cardNumber, expiryDate, cvv } = formData;

    if (!cardholderName.trim()) {
      setError("Vui lòng nhập tên chủ thẻ");
      return false;
    }

    const cleanedCardNumber = cardNumber.replace(/\s/g, "");
    if (cleanedCardNumber.length !== 16) {
      setError("Số thẻ phải là 16 chữ số");
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      setError("Ngày hết hạn phải ở định dạng MM/YY");
      return false;
    }

    if (cvv.length < 3 || cvv.length > 4) {
      setError("CVV phải là 3-4 chữ số");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // if (!validateForm()) {
    //   return;
    // }

    setProcessing(true);

    try {
      const paymentData = {
        id: Math.floor(Math.random() * 1000000),
        orderId: parseInt(orderId),
        paymentMethod: formData.paymentMethod,
        paymentDate: new Date().toISOString(),
        // amount: order.totalAmount,
        // status: "COMPLETED",
      };

      const response = await fetch(`${API_BASE}/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Thanh toán không thành công");
      }

      const result = await response.json();
      setSuccess(true);

      setTimeout(() => {
        navigate("/my-orders", { state: { paymentSuccess: true } });
      }, 2000);
    } catch (err) {
      setError(err.message || "Lỗi khi xử lý thanh toán");
      console.error("Payment error:", err);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-gray-600 flex items-center gap-2">
          <Hourglass className="size-4 animate-spin text-yellow-400" />
          Đang tải thông tin...
        </p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="size-16 text-red-500 mx-auto mb-4" />
          <p className="text-2xl text-gray-800 font-semibold">
            Không tìm thấy đơn hàng
          </p>
          <button
            onClick={() => navigate("/my-orders")}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600"
          >
            Quay lại
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg">
          <CheckCircle className="size-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Thanh toán thành công!
          </h2>
          <p className="text-gray-600 mb-6">
            Đơn hàng #{order.id} đã được thanh toán.
          </p>
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <Hourglass className="size-4 animate-spin text-yellow-400" />
            Đang chuyển hướng...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <CreditCard className="size-9" /> Thanh Toán Đơn Hàng
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <AlertCircle className="size-5" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Payment Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-lg shadow p-6 space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h2 className="font-semibold text-gray-800 mb-3">
                  Thông tin đơn hàng
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mã đơn hàng:</span>
                    <span className="font-medium">#{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tổng tiền:</span>
                    <span className="font-bold text-orange-600 text-lg">
                      {Number(order.totalAmount || 0).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Số món:</span>
                    <span className="font-medium">
                      {order.orderDetails?.length || 0} món
                    </span>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phương thức thanh toán
                </label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  disabled={processing}
                >
                  <option value="CREDIT_CARD">Thẻ tín dụng</option>
                  <option value="DEBIT_CARD">Thẻ ghi nợ</option>
                  <option value="RECEIVED_PAID">
                    Thanh toán khi nhận hàng
                  </option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className={`w-full py-3 rounded-lg font-semibold text-white text-lg transition ${
                  processing
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                }`}
              >
                {processing ? "⏳ Đang xử lý..." : "Xác nhận thanh toán"}
              </button>

              {/* Security Notice */}
              <p className="text-xs text-gray-500 text-center">
                Thông tin thẻ của bạn được bảo mật bằng mã hóa SSL
              </p>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 sticky top-20">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                Chi tiết đơn hàng
              </h2>

              {order.orderDetails && order.orderDetails.length > 0 && (
                <div className="space-y-3 mb-4 pb-4 border-b">
                  {order.orderDetails.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Món {idx + 1} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {Number(item.lineTotal || 0).toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính:</span>
                  <span>
                    {Number(order.totalAmount || 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí vận chuyển:</span>
                  <span>Miễn phí</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between">
                  <span className="font-bold text-gray-800">Tổng cộng:</span>
                  <span className="font-bold text-orange-600 text-lg">
                    {Number(order.totalAmount || 0).toLocaleString("vi-VN")}đ
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/my-orders")}
                className="w-full mt-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
