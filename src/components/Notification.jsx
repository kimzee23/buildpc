import { useState, useEffect } from 'react';
import { Box, Text, CloseButton } from '@chakra-ui/react';

const Notification = ({ message, type, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    const bgColor = {
        success: 'green.500',
        error: 'red.500',
        info: 'blue.500',
        warning: 'orange.500'
    }[type] || 'gray.500';

    return (
        <Box
            position="fixed"
            bottom="4"
            right="4"
            bg={bgColor}
            color="white"
            px={4}
            py={3}
            rounded="md"
            boxShadow="lg"
            zIndex="toast"
        >
            <Flex align="center">
                <Text>{message}</Text>
                <CloseButton
                    ml={3}
                    onClick={() => {
                        setIsVisible(false);
                        onClose();
                    }}
                />
            </Flex>
        </Box>
    );
};

export const useNotification = () => {
    const [notification, setNotification] = useState(null);

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
    };

    const NotificationComponent = () => {
        if (!notification) return null;

        return (
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={() => setNotification(null)}
            />
        );
    };

    return { showNotification, NotificationComponent };
};