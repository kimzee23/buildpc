import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('/api/auth/check');
                setUser(response.data.user);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        const response = await axios.post('/api/auth/login', { email, password });
        setUser(response.data.user);
    };

    const logout = async () => {
        await axios.post('/api/auth/logout');
        setUser(null);
    };

    const register = async (userData) => {
        const response = await axios.post('/api/auth/register', userData);
        setUser(response.data.user);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);