import { Box, Flex, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { FaLaptop, FaCogs, FaShippingFast } from 'react-icons/fa';

const steps = [
    {
        icon: FaLaptop,
        title: "Choose Your Model",
        description: "Select from our Ultrabook, Gaming Beast, or Creator Studio models."
    },
    {
        icon: FaCogs,
        title: "Pick Your Specs",
        description: "Customize processor, RAM, storage, and graphics to match your needs."
    },
    {
        icon: FaShippingFast,
        title: "Finish & Order",
        description: "Your custom laptop will be delivered in just 7 days."
    }
];

const CustomizationSteps = () => {
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box py={20} px={8} maxW="7xl" mx="auto">
            <Heading as="h2" size="xl" textAlign="center" mb={12}>
                Build Your Dream Laptop in 3 Simple Steps
            </Heading>

            <Flex
                direction={isMobile ? "column" : "row"}
                gap={8}
                justify="space-between"
            >
                {steps.map((step, index) => (
                    <Box
                        key={index}
                        flex="1"
                        p={8}
                        borderRadius="lg"
                        boxShadow="md"
                        _hover={{
                            boxShadow: "xl",
                            transform: "translateY(-5px)",
                            transition: "all 0.3s ease"
                        }}
                        textAlign="center"
                    >
                        <VStack spacing={4}>
                            <Box as={step.icon} size="48px" color="brand.700" />
                            <Heading as="h3" size="md">{step.title}</Heading>
                            <Text>{step.description}</Text>
                        </VStack>
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default CustomizationSteps;