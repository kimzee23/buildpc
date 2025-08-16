import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { Box, Text, Button, Flex } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const AdminRoute = ({ children }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (user && !user.isAdmin) {
        return (
            <Box textAlign="center" py={20}>
                <Text fontSize="xl" mb={4}>Access Denied</Text>
                <Text mb={6}>You don't have permission to access this page.</Text>
                <Flex justify="center" gap={4}>
                    <Button as={RouterLink} to="/" colorScheme="blue">
                        Go Home
                    </Button>
                    <Button as={RouterLink} to="/account" variant="outline">
                        My Account
                    </Button>
                </Flex>
            </Box>
        );
    }

    return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default AdminRoute;