import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Heading, Text, VStack, Button, useToast } from '@chakra-ui/react';
import OrderHistory from '../components/account/OrderHistory';
import ProfileSettings from '../components/account/ProfileSettings';
import ShippingAddress from '../components/account/ShippingAddress';
import { useAuth } from '../context/AuthContext';

const AccountPage = () => {
    const { user, logout } = useAuth();
    const toast = useToast();

    const handleLogout = () => {
        logout();
        toast({
            title: 'Logged Out',
            description: 'You have been successfully logged out',
            status: 'info',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box py={8} px={4} maxW="6xl" mx="auto">
            <VStack spacing={6} align="stretch">
                <Heading as="h1" size="xl">My Account</Heading>
                <Text fontSize="lg" color="gray.600">
                    Welcome back, {user?.name}
                </Text>

                <Tabs variant="enclosed" isFitted>
                    <TabList>
                        <Tab>Orders</Tab>
                        <Tab>Profile</Tab>
                        <Tab>Shipping</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <OrderHistory />
                        </TabPanel>
                        <TabPanel>
                            <ProfileSettings />
                        </TabPanel>
                        <TabPanel>
                            <ShippingAddress />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Box pt={4}>
                    <Button
                        colorScheme="red"
                        variant="outline"
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                </Box>
            </VStack>
        </Box>
    );
};

export default AccountPage;