import { Box, SimpleGrid, Heading, Text, Image, Card, CardBody } from '@chakra-ui/react';
import React from 'react';

const FeaturedModels = ({ laptops = [] }) => {
    return (
        <Box as="section" py={10} px={6}>
            <Heading size="xl" mb={6} textAlign="center">
                Featured Laptop Models
            </Heading>

            {laptops.length === 0 ? (
                <Text textAlign="center" color="gray.500">
                    No laptops available yet.
                </Text>
            ) : (
                <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {laptops.map((laptop, index) => (
                        <Card
                            key={index}
                            borderRadius="lg"
                            overflow="hidden"
                            _hover={{
                                transform: 'translateY(-5px)',
                                boxShadow: 'xl',
                            }}
                        >
                            <CardBody>
                                <Image
                                    src={laptop.image}
                                    alt={laptop.name}
                                    objectFit="cover"
                                    borderRadius="md"
                                    mb={3}
                                />
                                <Heading size="md">{laptop.name}</Heading>
                                <Text mt={2} color="gray.600">
                                    {laptop.description}
                                </Text>
                            </CardBody>
                        </Card>
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default FeaturedModels;
