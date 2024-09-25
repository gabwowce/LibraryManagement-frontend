import React, { createContext, useState, useContext, useEffect } from 'react';
import config from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    
    const login = async (username, password, navigate, rememberMe) => {
        try {
            const response = await fetch(`${config.baseURL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                if (rememberMe) {
                    sessionStorage.setItem('token', data.token); 
                    sessionStorage.setItem('user', JSON.stringify(data.user)); 
                } else {
                    localStorage.setItem('token', data.token); 
                    localStorage.setItem('user', JSON.stringify(data.user)); 
                }
                setUser(data.user);
                data.user.role === 'member' ? (navigate('/books')) : (navigate('/'));
            } if (!response.ok) {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error("Login error: ", error);
            throw error; 
        }
    };
  

    const logout = async (navigate) => {
        try {
            const response = await fetch(`${config.baseURL}/api/auth/logout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                setUser(null);
                navigate('/login'); 
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext; 
