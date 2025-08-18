import { Box, Button,  Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HeroSection from '../components/home/HeroSection';
import CustomizationSteps from '../components/home/CustomizationSteps';
import FeaturedModels from '../components/home/FeaturedModels';
import PerformanceHighlights from '../components/home/PerformanceHighlights';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <Box>
            <HeroSection />

            <CustomizationSteps />

            <FeaturedModels  />

            <PerformanceHighlights />

            {/* Final CTA Section */}
            <Box py={20} px={4} bg="brand.800" color="white" textAlign="center">
                <VStack spacing={6} maxW="3xl" mx="auto">
                    <Heading as="h2" size="xl">Ready to Build Your Dream Laptop?</Heading>
                    <Text fontSize="xl">
                        Customize a laptop that perfectly matches your needs and style.
                    </Text>
                    <Button
                        size="lg"
                        colorScheme="whiteAlpha"
                        onClick={() => navigate('/customize')}
                    >
                        Start Customizing Now
                    </Button>
                </VStack>
            </Box>
        </Box>
    );
};

export default HomePage;