/* File: src/components/Navbar.jsx */
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import {
  Hamburger,
  House,
  PackagePlus,
  Receipt,
  ShoppingCart,
} from "lucide-react";

export default function Navbar() {
  const { user, logout, role } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const effectiveRole = role || user?.role || "";
  const displayName = user?.fullName || user?.username || "Người dùng";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-orange-500">
              🍔 Mini Food
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-orange-500 font-medium"
            >
              <House />
            </Link>

            {user && effectiveRole === "ADMIN" && (
              <Link
                to="/admin-foods"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                <PackagePlus />
              </Link>
            )}

            {user && (
              <Link to="/cart" className="relative">
                <span className="text-2xl hover:text-orange-500">
                  <ShoppingCart />
                </span>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-sm font-bold">
                    {cart.length}
                  </span>
                )}
              </Link>
            )}

            {user && (
              <Link
                to="/my-orders"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                <Receipt />
              </Link>
            )}

            {user && (
              <div className="border-l pl-6 flex items-center gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-700 leading-none">
                    {displayName}
                  </span>
                  {effectiveRole && (
                    <span className="text-xs font-semibold text-orange-600 uppercase tracking-wide mt-1">
                      {effectiveRole}
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Đăng Xuất
                </button>
              </div>
            )}

            {!user && (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="text-gray-700 border border-gray-300 px-4 py-1 rounded hover:border-orange-500 hover:text-orange-500 transition"
                >
                  Đăng Nhập
                </Link>
                <Link
                  to="/register"
                  className="bg-orange-500 text-white px-4 py-1 rounded hover:bg-orange-600 transition"
                >
                  Đăng Ký
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
