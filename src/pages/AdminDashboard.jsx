import { Box, Grid, GridItem, Heading, Stat, StatLabel, StatNumber, StatHelpText } from '@chakra-ui/react';
import AdminOrders from '../components/admin/AdminOrders';
import AdminProducts from '../components/admin/AdminProducts';

const AdminDashboard = () => {
    return (
        <Box p={8}>
            <Heading as="h1" size="xl" mb={8}>Admin Dashboard</Heading>

            <Grid templateColumns="repeat(4, 1fr)" gap={6} mb={8}>
                <GridItem colSpan={1}>
                    <Stat p={4} bg="white" borderRadius="md" boxShadow="md">
                        <StatLabel>Total Orders</StatLabel>
                        <StatNumber>1,234</StatNumber>
                        <StatHelpText>+12% this month</StatHelpText>
                    </Stat>
                </GridItem>
                <GridItem colSpan={1}>
                    <Stat p={4} bg="white" borderRadius="md" boxShadow="md">
                        <StatLabel>Revenue</StatLabel>
                        <StatNumber>₦12,345,678</StatNumber>
                        <StatHelpText>+8% this month</StatHelpText>
                    </Stat>
                </GridItem>
                <GridItem colSpan={1}>
                    <Stat p={4} bg="white" borderRadius="md" boxShadow="md">
                        <StatLabel>Customers</StatLabel>
                        <StatNumber>567</StatNumber>
                        <StatHelpText>+5% this month</StatHelpText>
                    </Stat>
                </GridItem>
                <GridItem colSpan={1}>
                    <Stat p={4} bg="white" borderRadius="md" boxShadow="md">
                        <StatLabel>Avg. Order Value</StatLabel>
                        <StatNumber>₦234,567</StatNumber>
                        <StatHelpText>+3% this month</StatHelpText>
                    </Stat>
                </GridItem>
            </Grid>

            <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                <GridItem>
                    <AdminOrders />
                </GridItem>
                <GridItem>
                    <AdminProducts />
                </GridItem>
            </Grid>
        </Box>
    );
};

export default AdminDashboard;