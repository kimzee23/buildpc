import { Box, SimpleGrid, Heading, Text, Button, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FeaturedModels = ({ laptops = [] }) => {
    const navigate = useNavigate();

    return (
        <Box py={20} px={8} bg="gray.50">
            <Heading as="h2" size="xl" textAlign="center" mb={12}>
                Featured Laptop Models
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="7xl" mx="auto">
                {laptops?.map((laptop, index) => (
                    <Box
                        key={index}
                        borderRadius="lg"
                        overflow="hidden"
                        boxShadow="md"
                        _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                        transition="all 0.3s ease"
                        bg="white"
                    >
                        {/* Laptop Image */}
                        <Image
                            src={`/assets/images/${laptop.modelName.toLowerCase().replace(/\s+/g, '-')}.jpg`}
                            alt={laptop.modelName}
                            h="300px"
                            w="100%"
                            objectFit="cover"
                            _hover={{ transform: 'scale(1.05)' }}
                            transition="transform 0.3s ease"
                        />

                        {/* Laptop Info */}
                        <Stack p={6} spacing={3}>
                            <Heading size="md">{laptop.modelName}</Heading>
                            <Text color="gray.600">
                                Starting at ₦{laptop.basePrice.toLocaleString()}
                            </Text>
                            <Text noOfLines={3}>{laptop.features?.join(' • ')}</Text>

                            {/* CTA */}
                            <Button
                                mt={4}
                                w="100%"
                                colorScheme="teal"
                                onClick={() =>
                                    navigate('/customize', { state: { model: laptop.modelName } })
                                }
                            >
                                Customize
                            </Button>
                        </Stack>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default FeaturedModels;
