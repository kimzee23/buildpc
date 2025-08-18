import { extendTheme, ChakraProvider } from '@chakra-ui/react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import CustomizePage from './pages/CustomizePage';
import OrderConfirmation from './pages/OrderConfirmation';
import AccountPage from './pages/AccountPage';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';

const theme = extendTheme({
    fonts: { heading: "'Inter', sans-serif", body: "'Inter', sans-serif" },
    colors: { brand: { 900:'#1a365d',800:'#153e75',700:'#2a69ac',600:'#3182ce',500:'#4299e1' } }
});

export default function App() {
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/customize" element={<CustomizePage />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="/account" element={
                        <ProtectedRoute>
                            <AccountPage />
                        </ProtectedRoute>
                    }/>

                    <Route path="/admin" element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }/>

                    <Route path="*" element={<HomePage />} />
                </Routes>
            </Layout>
        </ChakraProvider>
    );
}
