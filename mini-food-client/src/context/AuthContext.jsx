/* File: src/context/AuthContext.jsx */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    // Khởi tạo - kiểm tra localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        const savedRole = localStorage.getItem('role');

        if (savedToken && savedUser && savedRole) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
            setRole(savedRole);
        }

        setLoading(false);
    }, []);

    // Hàm đăng nhập
    const login = (userData, token, role) => {
        setUser(userData);
        setToken(token);
        setRole(role);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', role);
    };

    // Hàm đăng xuất
    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
    };

    return (
        <AuthContext.Provider
            value={{ user, token, role, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}
