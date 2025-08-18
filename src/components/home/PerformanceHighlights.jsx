
import { VStack, HStack, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { FaLaptop, FaBolt, FaShieldAlt } from "react-icons/fa";

export default function FeaturesSection() {
    const features = [
        {
            icon: FaLaptop,
            title: "Powerful Hardware",
            description: "Experience top-tier performance with the latest processors.",
        },
        {
            icon: FaBolt,
            title: "Fast Charging",
            description: "Stay powered up with quick charge support.",
        },
        {
            icon: FaShieldAlt,
            title: "Durable Design",
            description: "Built to last with reinforced materials.",
        },
    ];

    return (
        <VStack spacing={8} align="start">
            <Heading as="h2" size="xl">
                Engineered for Performance
            </Heading>

            {features.map((feature, index) => (
                <HStack key={index} align="start" spacing={4}>
                    <Box p={2} bg="gray.100" borderRadius="full">
                        <Icon as={feature.icon} boxSize={6} color="blue.600" />
                    </Box>
                    <Box>
                        <Text fontWeight="bold">{feature.title}</Text>
                        <Text color="gray.600">{feature.description}</Text>
                    </Box>
                </HStack>
            ))}
        </VStack>
    );
}
