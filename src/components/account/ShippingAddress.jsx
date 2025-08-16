import { Box, FormControl, FormLabel, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ShippingAddress = () => {
    const [address, setAddress] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'Nigeria'
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const { data } = await axios.get('/api/account/shipping');
                if (data) {
                    setAddress(data);
                }
            } catch (error) {
                console.error('Error fetching shipping address:', error);
            }
        };

        fetchAddress();
    }, []);

    const handleChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put('/api/account/shipping', address);
            toast({
                title: 'Address Updated',
                description: 'Your shipping address has been saved',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: error.response?.data?.message || 'Failed to update address',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box as="form" onSubmit={handleSubmit}>
            <VStack spacing={6}>
                <FormControl isRequired>
                    <FormLabel>Street Address</FormLabel>
                    <Input
                        name="street"
                        value={address.street}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Input
                        name="city"
                        value={address.city}
                        onChange={handleChange}
                        placeholder="Lagos"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Input
                        name="state"
                        value={address.state}
                        onChange={handleChange}
                        placeholder="Lagos State"
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Postal Code</FormLabel>
                    <Input
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleChange}
                        placeholder="100001"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Country</FormLabel>
                    <Input
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                        isDisabled
                    />
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    alignSelf="flex-start"
                >
                    Save Address
                </Button>
            </VStack>
        </Box>
    );
};

export default ShippingAddress;