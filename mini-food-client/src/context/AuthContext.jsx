/* File: src/context/AuthContext.jsx */
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        const savedRole = localStorage.getItem('role');

        if (savedToken && savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setToken(savedToken);
                setUser(parsedUser);
                setRole(savedRole || parsedUser?.role || null);
            } catch (e) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                localStorage.removeItem('role');
            }
        }

        setLoading(false);
    }, []);

    const login = (userData, token, role) => {
        const resolvedRole = role || userData?.role || null;

        if (!userData || !token) {
            console.error('Login called with invalid data:', {
                userData,
                token,
                role: resolvedRole,
            });
            return;
        }
        setUser(userData);
        setToken(token);
        setRole(resolvedRole);
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        if (resolvedRole) {
            localStorage.setItem('role', resolvedRole);
        } else {
            localStorage.removeItem('role');
        }
    };

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
