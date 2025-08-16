import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, Heading } from '@chakra-ui/react';
import OrderHistory from '../components/account/OrderHistory';
import ProfileSettings from '../components/account/ProfileSettings';

const AccountPage = () => {
    return (
        <Box py={8} px={4} maxW="6xl" mx="auto">
            <Heading as="h1" size="xl" mb={8}>My Account</Heading>

            <Tabs variant="enclosed">
                <TabList>
                    <Tab>Order History</Tab>
                    <Tab>Profile Settings</Tab>
                    <Tab>Shipping Addresses</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <OrderHistory />
                    </TabPanel>
                    <TabPanel>
                        <ProfileSettings />
                    </TabPanel>
                    <TabPanel>
                        <ShippingAddresses />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
};

export default AccountPage;