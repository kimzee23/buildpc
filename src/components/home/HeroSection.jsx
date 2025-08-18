import { Box, Button, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <Box position="relative" h="100vh" w="100%" overflow="hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    zIndex: -2, // push further back
                }}
            >
                <source src="/assets/videos/laptop-hero.mp4" type="video/mp4" />
            </video>

            {/* Fallback Image (behind video) */}
            <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bgImage="url('/assets/images/laptop-hero.jpg')"
                bgSize="cover"
                bgPos="center"
                zIndex={-3} // keep under video
            />

            {/* Overlay + Content */}
            <Flex
                h="100%"
                align="center"
                justify="center"
                px={8}
                bg="rgba(0, 0, 0, 0.3)"
            >
                <VStack spacing={6} align="center" textAlign="center" color="white">
                    <Heading as="h1" size="2xl" fontWeight="bold" letterSpacing="tighter">
                        Your Laptop. Your Way.
                    </Heading>
                    <Text fontSize="xl" maxW="2xl">
                        Build the laptop that works as hard as you do.
                    </Text>
                    <Flex gap={4} direction={{ base: "column", md: "row" }}>
                        <Button
                            size="lg"
                            colorScheme="blackAlpha"
                            bg="black"
                            _hover={{ bg: "gray.800" }}
                            onClick={() => navigate("/customize")}
                        >
                            Customize Now
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            color="white"
                            _hover={{ bg: "whiteAlpha.200" }}
                        >
                            Learn More
                        </Button>
                    </Flex>
                </VStack>
            </Flex>
        </Box>
    );
};

export default HeroSection;
