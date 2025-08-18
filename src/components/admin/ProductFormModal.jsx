import { Box, Table, Thead, Tbody, Tr, Th, Td, Button, IconButton, useDisclosure, useToast } from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductFormModal from './ProductFormModal';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/api/products');
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load products',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleCreate = () => {
        setEditingProduct(null);
        onOpen();
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        onOpen();
    };

    const handleDelete = async (productId) => {
        try {
            await axios.delete(`/api/products/${productId}`);
            setProducts(products.filter(p => p._id !== productId));
            toast({
                title: 'Success',
                description: 'Product deleted successfully',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error('Error deleting product:', error);
            toast({
                title: 'Error',
                description: 'Failed to delete product',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleSubmit = async (productData) => {
        try {
            if (editingProduct) {
                // Update existing product
                const { data } = await axios.put(
                    `/api/products/${editingProduct._id}`,
                    productData
                );
                setProducts(products.map(p => p._id === data._id ? data : p));
                toast({
                    title: 'Success',
                    description: 'Product updated successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                // Create new product
                const { data } = await axios.post('/api/products', productData);
                setProducts([...products, data]);
                toast({
                    title: 'Success',
                    description: 'Product created successfully',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            }
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
            toast({
                title: 'Error',
                description: error.response?.data?.message || 'Failed to save product',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return <Box>Loading products...</Box>;
    }

    return (
        <Box>
            <Flex justify="space-between" align="center" mb={6}>
                <Heading as="h2" size="lg">Product Management</Heading>
                <Button
                    leftIcon={<AddIcon />}
                    colorScheme="blue"
                    onClick={handleCreate}
                >
                    Add Product
                </Button>
            </Flex>

            <Table variant="striped" colorScheme="gray">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Model</Th>
                        <Th>Price</Th>
                        <Th>Stock</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {products.map(product => (
                        <Tr key={product._id}>
                            <Td>{product.name}</Td>
                            <Td>{product.model}</Td>
                            <Td>₦{product.price.toLocaleString()}</Td>
                            <Td>{product.stock}</Td>
                            <Td>
                                <IconButton
                                    icon={<EditIcon />}
                                    aria-label="Edit product"
                                    mr={2}
                                    onClick={() => handleEdit(product)}
                                />
                                <IconButton
                                    icon={<DeleteIcon />}
                                    aria-label="Delete product"
                                    colorScheme="red"
                                    onClick={() => handleDelete(product._id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <ProductFormModal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                product={editingProduct}
            />
        </Box>
    );
};

export default AdminProducts;