import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders/my-orders');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return 'green';
            case 'processing': return 'blue';
            case 'shipped': return 'orange';
            case 'cancelled': return 'red';
            default: return 'gray';
        }
    };

    if (loading) {
        return <Text>Loading your orders...</Text>;
    }

    if (orders.length === 0) {
        return <Text>You haven't placed any orders yet.</Text>;
    }

    return (
        <Box overflowX="auto">
            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Order #</Th>
                        <Th>Date</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map(order => (
                        <Tr key={order._id}>
                            <Td>{order.orderNumber}</Td>
                            <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
                            <Td>₦{order.totalPrice.toLocaleString()}</Td>
                            <Td>
                                <Badge colorScheme={getStatusColor(order.status)}>
                                    {order.status}
                                </Badge>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default OrderHistory;