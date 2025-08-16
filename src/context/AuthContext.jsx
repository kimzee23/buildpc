import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in on initial load
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await axios.get('/api/auth/me', config);
                setUser(data);
            } catch (err) {
                localStorage.removeItem('token');
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Register user
    const register = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/register', formData);
            localStorage.setItem('token', data.token);
            setUser({
                id: data._id,
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin,
            });
            navigate('/account');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    // Login user
    const login = async (formData) => {
        try {
            const { data } = await axios.post('/api/auth/login', formData);
            localStorage.setItem('token', data.token);
            setUser({
                id: data._id,
                name: data.name,
                email: data.email,
                isAdmin: data.isAdmin,
            });
            navigate('/account');
        } catch (err) {
            setError(err.response?.data?.message || err.message);
            throw err;
        }
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                register,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);