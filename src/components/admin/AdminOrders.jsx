import { Box, Table, Thead, Tbody, Tr, Th, Td, Badge, Select, Button, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const statusColors = {
    pending: 'yellow',
    processing: 'blue',
    shipped: 'teal',
    delivered: 'green',
    cancelled: 'red'
};

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get('/api/orders');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load orders',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
            setOrders(orders.map(order =>
                order._id === orderId ? { ...order, status: newStatus } : order
            ));
            toast({
                title: 'Success',
                description: 'Order status updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error updating order:', error);
            toast({
                title: 'Error',
                description: 'Failed to update order status',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <Box>Loading orders...</Box>;
    }

    return (
        <Box>
            <Heading as="h2" size="lg" mb={6}>Order Management</Heading>

            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Order #</Th>
                        <Th>Date</Th>
                        <Th>Customer</Th>
                        <Th>Total</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {orders.map(order => (
                        <Tr key={order._id}>
                            <Td>{order.orderNumber}</Td>
                            <Td>{format(new Date(order.createdAt), 'PPpp')}</Td>
                            <Td>{order.user?.name || 'Guest'}</Td>
                            <Td>₦{order.totalPrice.toLocaleString()}</Td>
                            <Td>
                                <Badge colorScheme={statusColors[order.status] || 'gray'}>
                                    {order.status}
                                </Badge>
                            </Td>
                            <Td>
                                <Select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    size="sm"
                                    width="150px"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="processing">Processing</option>
                                    <option value="shipped">Shipped</option>
                                    <option value="delivered">Delivered</option>
                                    <option value="cancelled">Cancelled</option>
                                </Select>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default AdminOrders;