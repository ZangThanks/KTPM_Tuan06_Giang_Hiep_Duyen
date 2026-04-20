/* File: src/context/CartContext.jsx */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Khởi tạo từ localStorage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Lưu cart vào localStorage mỗi lần thay đổi
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Thêm sản phẩm vào giỏ
    const addToCart = (food) => {
        const existingItem = cart.find((item) => item.foodId === food.foodId);

        if (existingItem) {
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            setCart(
                cart.map((item) =>
                    item.foodId === food.foodId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item,
                ),
            );
        } else {
            // Thêm sản phẩm mới
            setCart([...cart, { ...food, quantity: 1 }]);
        }
    };

    // Cập nhật số lượng
    const updateQuantity = (foodId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(foodId);
        } else {
            setCart(
                cart.map((item) =>
                    item.foodId === foodId ? { ...item, quantity } : item,
                ),
            );
        }
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (foodId) => {
        setCart(cart.filter((item) => item.foodId !== foodId));
    };

    // Xóa toàn bộ giỏ
    const clearCart = () => {
        setCart([]);
    };

    // Tính tổng tiền
    const getTotalPrice = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                updateQuantity,
                removeFromCart,
                clearCart,
                getTotalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
