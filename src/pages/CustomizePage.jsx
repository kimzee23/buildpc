import { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    VStack,
    HStack,
    Button,
    Select,
    RadioGroup,
    Radio,
    Stack,
    Divider,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import LaptopViewer from '../components/customization/LaptopViewer';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PaymentModal from '../components/payment/PaymentModal';

const CustomizePage = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [laptops, setLaptops] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [selectedColor, setSelectedColor] = useState('#2a69ac');
    const [selectedSpecs, setSelectedSpecs] = useState({
        processor: null,
        ram: null,
        storage: null,
        graphics: null,
    });
    const [totalPrice, setTotalPrice] = useState(0);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // @ts-ignore
    useEffect(() => {
        const fetchLaptops = async () => {
            try {
                const response = await axios.get('/api/laptops');
                setLaptops(response.data);
                if (response.data.length > 0) {
                    const first = response.data[0];
                    setSelectedModel(first.modelName);
                    setSelectedSpecs({
                        processor: first.processorOptions[0],
                        ram: first.ramOptions[0],
                        storage: first.storageOptions[0],
                        graphics: first.graphicsOptions[0] || null,
                    });
                    setTotalPrice(first.basePrice);
                }
            } catch (error) {
                console.error('Error fetching laptops:', error);
                toast({
                    title: 'Error',
                    description: 'Failed to load laptop configurations',
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchLaptops().catch((err) => {
            console.error("Unhandled fetch error:", err);
        });
    }, []);

    useEffect(() => {
        if (selectedModel && laptops.length > 0) {
            const model = laptops.find((l) => l.modelName === selectedModel);
            if (model) {
                const newPrice =
                    model.basePrice +
                    (selectedSpecs.processor?.price || 0) +
                    (selectedSpecs.ram?.price || 0) +
                    (selectedSpecs.storage?.price || 0) +
                    (selectedSpecs.graphics?.price || 0);
                setTotalPrice(newPrice);
            }
        }
    }, [selectedModel, selectedSpecs, laptops]);

    const handleSpecChange = (specType, value) => {
        setSelectedSpecs((prev) => ({
            ...prev,
            [specType]: value,
        }));
    };

    const getCurrentModel = () => {
        return laptops.find((l) => l.modelName === selectedModel);
    };

    const handleCheckout = () => {
        if (!selectedModel) {
            toast({
                title: 'Error',
                description: 'Please select a laptop model',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        const order = {
            laptopConfig: {
                model: selectedModel,
                color: selectedColor,
                processor: selectedSpecs.processor?.name,
                ram: selectedSpecs.ram?.size,
                storage: `${selectedSpecs.storage?.type} ${selectedSpecs.storage?.size}`,
                graphics: selectedSpecs.graphics?.name,
            },
            totalAmount: totalPrice,
            currency: 'NGN',
        };

        setOrderDetails(order);
        onOpen();
    };

    const handlePaymentSuccess = () => {
        toast({
            title: 'Order Placed!',
            description: 'Your custom laptop is being prepared for delivery.',
            status: 'success',
            duration: 8000,
            isClosable: true,
        });
        // navigate('/order-confirmation');
    };

    if (isLoading) {
        return (
            <Box py={20} textAlign="center">
                <Text fontSize="xl">Loading laptop configurations...</Text>
            </Box>
        );
    }

    return (
        <Box py={8} px={4} maxW="7xl" mx="auto">
            <Button
                leftIcon={<FaArrowLeft />}
                variant="ghost"
                mb={6}
                onClick={() => navigate('/')}
            >
                Back to Home
            </Button>

            <Flex direction={{ base: 'column', lg: 'row' }} gap={8}>
                {/* 3D Viewer */}
                <Box flex="1">
                    {selectedModel && (
                        <LaptopViewer
                            selectedModel={selectedModel.toLowerCase().replace(' ', '-')}
                            selectedColor={selectedColor}
                        />
                    )}
                </Box>

                {/* Customization Options */}
                <Box flex="1" maxW={{ lg: '500px' }}>
                    <VStack spacing={8} align="stretch">
                        <Heading as="h1" size="xl">
                            Customize Your Laptop
                        </Heading>

                        {/* Model Selection */}
                        <Box>
                            <Heading as="h2" size="md" mb={4}>
                                1. Choose Your Model
                            </Heading>
                            <Select
                                value={selectedModel || ''}
                                onChange={(e) => setSelectedModel(e.target.value)}
                            >
                                {laptops.map((laptop) => (
                                    <option key={laptop._id} value={laptop.modelName}>
                                        {laptop.modelName} (Starting at ₦
                                        {laptop.basePrice.toLocaleString()})
                                    </option>
                                ))}
                            </Select>
                        </Box>

                        {/* Color Selection */}
                        {selectedModel && (
                            <Box>
                                <Heading as="h2" size="md" mb={4}>
                                    2. Choose Your Color
                                </Heading>
                                <RadioGroup
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                >
                                    <Stack direction="row" spacing={4} wrap="wrap">
                                        {getCurrentModel()?.colorOptions.map((color, index) => (
                                            <Radio key={index} value={color.hexCode}>
                                                <Box
                                                    w="24px"
                                                    h="24px"
                                                    bg={color.hexCode}
                                                    borderRadius="full"
                                                    border="1px solid gray"
                                                    title={color.name}
                                                />
                                            </Radio>
                                        ))}
                                    </Stack>
                                </RadioGroup>
                            </Box>
                        )}

                        {/* Specs Selection */}
                        {selectedModel && (
                            <Box>
                                <Heading as="h2" size="md" mb={4}>
                                    3. Customize Your Specs
                                </Heading>

                                <VStack spacing={6} align="stretch">
                                    {/* Processor */}
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>
                                            Processor
                                        </Text>
                                        <Select
                                            value={selectedSpecs.processor?.name || ''}
                                            onChange={(e) => {
                                                const selected = getCurrentModel().processorOptions.find(
                                                    (p) => p.name === e.target.value
                                                );
                                                handleSpecChange('processor', selected);
                                            }}
                                        >
                                            {getCurrentModel().processorOptions.map(
                                                (processor, index) => (
                                                    <option key={index} value={processor.name}>
                                                        {processor.name} (+₦
                                                        {processor.price.toLocaleString()})
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </Box>

                                    {/* RAM */}
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>
                                            RAM
                                        </Text>
                                        <Select
                                            value={selectedSpecs.ram?.size || ''}
                                            onChange={(e) => {
                                                const selected = getCurrentModel().ramOptions.find(
                                                    (r) => r.size === e.target.value
                                                );
                                                handleSpecChange('ram', selected);
                                            }}
                                        >
                                            {getCurrentModel().ramOptions.map((ram, index) => (
                                                <option key={index} value={ram.size}>
                                                    {ram.size} (+₦{ram.price.toLocaleString()})
                                                </option>
                                            ))}
                                        </Select>
                                    </Box>

                                    {/* Storage */}
                                    <Box>
                                        <Text fontWeight="bold" mb={2}>
                                            Storage
                                        </Text>
                                        <Select
                                            value={
                                                selectedSpecs.storage
                                                    ? `${selectedSpecs.storage.type} ${selectedSpecs.storage.size}`
                                                    : ''
                                            }
                                            onChange={(e) => {
                                                const selected =
                                                    getCurrentModel().storageOptions.find(
                                                        (s) =>
                                                            `${s.type} ${s.size}` === e.target.value
                                                    );
                                                handleSpecChange('storage', selected);
                                            }}
                                        >
                                            {getCurrentModel().storageOptions.map(
                                                (storage, index) => (
                                                    <option
                                                        key={index}
                                                        value={`${storage.type} ${storage.size}`}
                                                    >
                                                        {storage.type} {storage.size} (+₦
                                                        {storage.price.toLocaleString()})
                                                    </option>
                                                )
                                            )}
                                        </Select>
                                    </Box>

                                    {/* Graphics */}
                                    {getCurrentModel().graphicsOptions?.length > 0 && (
                                        <Box>
                                            <Text fontWeight="bold" mb={2}>
                                                Graphics
                                            </Text>
                                            <Select
                                                value={selectedSpecs.graphics?.name || ''}
                                                onChange={(e) => {
                                                    const selected =
                                                        getCurrentModel().graphicsOptions.find(
                                                            (g) => g.name === e.target.value
                                                        );
                                                    handleSpecChange('graphics', selected);
                                                }}
                                            >
                                                {getCurrentModel().graphicsOptions.map(
                                                    (graphics, index) => (
                                                        <option key={index} value={graphics.name}>
                                                            {graphics.name} (+₦
                                                            {graphics.price.toLocaleString()})
                                                        </option>
                                                    )
                                                )}
                                            </Select>
                                        </Box>
                                    )}
                                </VStack>
                            </Box>
                        )}

                        <Divider />

                        {/* Price Summary */}
                        <Box>
                            <HStack justify="space-between">
                                <Text fontSize="xl" fontWeight="bold">
                                    Total Price:
                                </Text>
                                <Text fontSize="xl" fontWeight="bold">
                                    ₦{totalPrice.toLocaleString()}
                                </Text>
                            </HStack>
                        </Box>

                        <Button
                            colorScheme="blue"
                            size="lg"
                            w="100%"
                            onClick={handleCheckout}
                            disabled={!selectedModel}
                            isLoading={isLoading}
                        >
                            Proceed to Checkout
                        </Button>
                    </VStack>
                </Box>
            </Flex>

            {/* Payment Modal */}
            {orderDetails && (
                <PaymentModal
                    isOpen={isOpen}
                    onClose={onClose}
                    orderDetails={orderDetails}
                    onPaymentSuccess={handlePaymentSuccess}
                />
            )}
        </Box>
    );
};

export default CustomizePage;
