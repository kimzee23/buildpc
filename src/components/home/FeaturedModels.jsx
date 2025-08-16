import { Box, SimpleGrid, Heading, Text, Button, Card, CardBody, CardFooter, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const FeaturedModels = ({ laptops }) => {
    const navigate = useNavigate();

    return (
        <Box py={20} px={8} bg="gray.50">
            <Heading as="h2" size="xl" textAlign="center" mb={12}>
                Featured Laptop Models
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} maxW="7xl" mx="auto">
                {laptops.map((laptop, index) => (
                    <Card
                        key={index}
                        borderRadius="lg"
                        overflow="hidden"
                        _hover={{ transform: 'translateY(-5px)', boxShadow: 'xl' }}
                        transition="all 0.3s ease"
                    >
                        <CardBody p={0}>
                            <Image
                                src={`/assets/images/${laptop.modelName.toLowerCase().replace(' ', '-')}.jpg`}
                                alt={laptop.modelName}
                                h="300px"
                                w="100%"
                                objectFit="cover"
                                _hover={{ transform: 'scale(1.05)' }}
                                transition="transform 0.3s ease"
                            />
                            <Stack p={6} spacing={3}>
                                <Heading size="md">{laptop.modelName}</Heading>
                                <Text color="gray.600">Starting at ${laptop.basePrice}</Text>
                                <Text noOfLines={3}>{laptop.features.join(' • ')}</Text>
                            </Stack>
                        </CardBody>
                        <CardFooter>
                            <Button
                                w="100%"
                                colorScheme="blackAlpha"
                                onClick={() => navigate('/customize', { state: { model: laptop.modelName } })}
                            >
                                Customize
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default FeaturedModels;