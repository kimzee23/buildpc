// src/pages/Build.jsx
import { useState } from 'react';
import { Box, Heading, Grid, VStack, Text, Select, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const configurationOptions = {
    models: [
        { id: 'performance', name: 'Performance', basePrice: 1899 },
        { id: 'ultra-portable', name: 'Ultra Portable', basePrice: 2099 }
    ],
    processors: [
        { id: 'i5', name: 'Intel Core i5', price: 0 },
        { id: 'i7', name: 'Intel Core i7', price: 300 },
        { id: 'i9', name: 'Intel Core i9', price: 600 }
    ],
    memory: [
        { id: '16gb', name: '16GB RAM', price: 0 },
        { id: '32gb', name: '32GB RAM', price: 400 },
        { id: '64gb', name: '64GB RAM', price: 1000 }
    ],
    storage: [
        { id: '512gb', name: '512GB SSD', price: 0 },
        { id: '1tb', name: '1TB SSD', price: 300 },
        { id: '2tb', name: '2TB SSD', price: 700 }
    ]
};

export default function Build() {
    const navigate = useNavigate();
    const [config, setConfig] = useState({
        model: configurationOptions.models[0],
        processor: configurationOptions.processors[1],
        memory: configurationOptions.memory[0],
        storage: configurationOptions.storage[0]
    });

    const calculateTotal = () => {
        return config.model.basePrice + config.processor.price +
            config.memory.price + config.storage.price;
    };

    const handleConfigChange = (key, value) => {
        setConfig(prev => ({
            ...prev,
            [key]: configurationOptions[key].find(opt => opt.id === value)
        }));
    };

    return (
        <Box maxW="1200px" mx="auto" p={4}>
            <Heading as="h1" size="xl" mb={8}>
                Build Your Laptop
            </Heading>

            <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
                {/* Configuration Panel */}
                <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                    <VStack spacing={6} align="stretch">
                        <Box>
                            <Text fontWeight="bold" mb={2}>Model</Text>
                            <Select
                                value={config.model.id}
                                onChange={(e) => handleConfigChange('model', e.target.value)}
                            >
                                {configurationOptions.models.map(model => (
                                    <option key={model.id} value={model.id}>{model.name}</option>
                                ))}
                            </Select>
                        </Box>

                        <Box>
                            <Text fontWeight="bold" mb={2}>Processor</Text>
                            <Select
                                value={config.processor.id}
                                onChange={(e) => handleConfigChange('processor', e.target.value)}
                            >
                                {configurationOptions.processors.map(proc => (
                                    <option key={proc.id} value={proc.id}>
                                        {proc.name} (+${proc.price})
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        {/* Add similar selects for Memory and Storage */}

                        <Button
                            colorScheme="blue"
                            size="lg"
                            onClick={() => navigate('/checkout', { state: { config, total: calculateTotal() } })}
                        >
                            Proceed to Checkout (${calculateTotal()})
                        </Button>
                    </VStack>
                </Box>

                {/* Preview Panel */}
                <Box bg="white" p={6} borderRadius="md" boxShadow="md">
                    <Heading as="h2" size="md" mb={4}>
                        Your Configuration
                    </Heading>
                    <VStack align="stretch" spacing={4}>
                        <Text><strong>Model:</strong> {config.model.name}</Text>
                        <Text><strong>Processor:</strong> {config.processor.name}</Text>
                        <Text><strong>Memory:</strong> {config.memory.name}</Text>
                        <Text><strong>Storage:</strong> {config.storage.name}</Text>
                        <Text fontSize="xl" fontWeight="bold" mt={4}>
                            Total: ${calculateTotal()}
                        </Text>
                    </VStack>
                </Box>
            </Grid>
        </Box>
    );
}