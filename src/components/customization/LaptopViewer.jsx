import { Suspense, useState, useRef, useEffect, forwardRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    VStack,
    Text,
    Spinner,
    Center,
} from '@chakra-ui/react';

// Forward ref so RotatingModel can control rotation
const Model = forwardRef(({ modelUrl, color }, ref) => {
    const { scene } = useGLTF(modelUrl);

    useEffect(() => {
        if (scene) {
            scene.traverse((child) => {
                if (child.isMesh && child.material) {
                    try {
                        const hexColor = color?.startsWith('#')
                            ? parseInt(color.replace('#', '0x'), 16)
                            : 0x2a69ac;
                        child.material.color.setHex(hexColor);
                    } catch (error) {
                        console.error('Error applying color:', error);
                    }
                }
            });
        }
    }, [scene, color]);

    return scene ? <primitive object={scene} ref={ref} /> : null;
});

function RotatingModel({ modelUrl, color, rotationSpeed }) {
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += rotationSpeed;
        }
    });

    return <Model ref={ref} modelUrl={modelUrl} color={color} />;
}

const LaptopViewer = ({ selectedModel, selectedColor }) => {
    const [rotationSpeed, setRotationSpeed] = useState(0.005);
    const [autoRotate] = useState(true);

    if (!selectedModel) {
        return (
            <Center h="600px">
                <Text>No model selected</Text>
            </Center>
        );
    }

    const modelPath = `/assets/models/${selectedModel}.glb`;

    return (
        <VStack spacing={4} w="100%" h="600px">
            <Box w="100%" h="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Suspense fallback={<Spinner size="xl" />}>
                        {autoRotate ? (
                            <RotatingModel
                                modelUrl={modelPath}
                                color={selectedColor || '#2a69ac'}
                                rotationSpeed={rotationSpeed}
                            />
                        ) : (
                            <>
                                <Model modelUrl={modelPath} color={selectedColor || '#2a69ac'} />
                                <OrbitControls enableZoom={true} />
                            </>
                        )}
                        <Environment preset="city" />
                    </Suspense>
                </Canvas>
            </Box>

            {/* Rotation speed slider */}
            <Slider
                defaultValue={5}
                min={0}
                max={10}
                step={0.1}
                w="80%"
                onChange={(val) => setRotationSpeed(val / 1000)}
            >
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
            </Slider>
        </VStack>
    );
};
export default  LaptopViewer ;