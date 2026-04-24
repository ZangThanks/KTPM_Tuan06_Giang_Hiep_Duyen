import { useState } from "react";
import { Bell, X } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function NotificationDropdown() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications);

    if (!showNotifications && notifications.length === 0) {
      setLoadingNotifications(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${API_BASE}/notifications/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoadingNotifications(false);
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleNotificationClick}
        className="text-gray-700 hover:text-orange-500 cursor-pointer transition"
      >
        <Bell />
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h3 className="font-bold text-gray-800">Thông báo</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="max-h-96 overflow-y-auto">
            {loadingNotifications ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : notifications.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className="p-4 hover:bg-gray-50 cursor-pointer transition"
                  >
                    <p className="text-sm font-medium text-gray-800">
                      Đơn hàng #{notif.orderId}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notif.message}
                    </p>
                    {notif.createdAt && (
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(notif.createdAt).toLocaleString("vi-VN")}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>Không có thông báo nào</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
