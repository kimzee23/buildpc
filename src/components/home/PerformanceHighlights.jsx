import { Box, Flex, Heading, Text, VStack, HStack, Icon } from '@chakra-ui/react';
import { FaBatteryFull, FaSnowflake, FaWeight, FaBrain } from 'react-icons/fa';

const features = [
    {
        icon: FaBatteryFull,
        title: "Up to 20 hours battery",
        description: "Work all day without needing to recharge."
    },
    {
        icon: FaSnowflake,
        title: "Next-gen cooling system",
        description: "Stay cool under pressure with our advanced thermal architecture."
    },
    {
        icon: FaWeight,
        title: "Ultra-thin aluminum body",
        description: "Premium materials for durability and style."
    },
    {
        icon: FaBrain,
        title: "AI-powered performance boost",
        description: "Intelligent optimization for your workflow."
    }
];

const PerformanceHighlights = () => {
    return (
        <Box py={20} px={8} maxW="7xl" mx="auto">
            <Flex direction={{ base: 'column', md: 'row' }} gap={12} align="center">
                <Box flex="1">
                    <Image
                        src="/assets/images/laptop-keyboard.jpg"
                        alt="Laptop keyboard"
                        borderRadius="lg"
                        w="100%"
                    />
                </Box>

                <Box flex="1">
                    <VStack spacing={8} align="start">
                        <Heading as="h2" size="xl">Engineered for Performance</Heading>

                        {features.map((feature, index) => (
                            <HStack key={index} align="start" spacing={4}>
                                <Box p={2} bg="brand.50" borderRadius="full">
                                    <Icon as={feature.icon} boxSize={6} color="brand.600" />
                                </Box>
                                <Box>
                                    <Text fontWeight="bold">{feature.title}</Text>
                                    <Text color="gray.600">{feature.description}</Text>
                                </Box>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            </Flex>
        </Box>
    );
};

export default PerformanceHighlights;