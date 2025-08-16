import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import OrderConfirmation from './pages/OrderConfirmation';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const theme = extendTheme({
    fonts: {
        heading: "'Inter', sans-serif",
        body: "'Inter', sans-serif",
    },
    colors: {
        brand: {
            900: '#1a365d',
            800: '#153e75',
            700: '#2a69ac',
            600: '#3182ce',
            500: '#4299e1',
        },
    },
});

function App() {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <Layout>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<HomePage />} />
                            <Route path="/customize" element={<CustomizePage />} />
                            <Route path="/order-confirmation" element={<OrderConfirmation />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />

                            {/* Protected User Routes */}
                            <Route path="/account" element={
                                <ProtectedRoute>
                                    <AccountPage />
                                </ProtectedRoute>
                            } />

                            {/* Admin Only Routes */}
                            <Route path="/admin" element={
                                <AdminRoute>
                                    <AdminDashboard />
                                </AdminRoute>
                            } />

                            {/* 404 Fallback */}
                            <Route path="*" element={<HomePage />} />
                        </Routes>
                    </Layout>
                </Router>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;