import { Box, FormControl, FormLabel, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const ProfileSettings = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('/api/auth/me');
                setFormData({
                    name: data.name,
                    email: data.email,
                    phone: data.phone || ''
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await axios.put('/api/auth/update-profile', formData);
            toast({
                title: 'Profile Updated',
                description: 'Your profile has been successfully updated',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Update Failed',
                description: error.response?.data?.message || 'Failed to update profile',
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
                <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        isDisabled
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                    />
                </FormControl>

                <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    alignSelf="flex-start"
                >
                    Update Profile
                </Button>
            </VStack>
        </Box>
    );
};

export default ProfileSettings;