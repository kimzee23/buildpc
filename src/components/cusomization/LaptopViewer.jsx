import { Suspense, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import {
    Box,
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    VStack,
} from '@chakra-ui/react';

function Model({ modelUrl, color }) {
    const { scene } = useGLTF(modelUrl);
    const ref = useRef();

    // Apply color to the laptop body
    scene.traverse((child) => {
        if (child.isMesh && child.name === 'Laptop_Body') {
            child.material.color.setHex(parseInt(color.replace('#', '0x')));
        }
    });

    return <primitive object={scene} ref={ref} />;
}

function RotatingModel({ modelUrl, color, rotationSpeed }) {
    const ref = useRef();

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += rotationSpeed;
        }
    });

    return <Model modelUrl={modelUrl} color={color} ref={ref} />;
}

const LaptopViewer = ({ selectedModel, selectedColor }) => {
    const [rotationSpeed, setRotationSpeed] = useState(0.005);
    const [autoRotate, setAutoRotate] = useState(true);

    return (
        <VStack spacing={4} w="100%" h="600px">
            <Box w="100%" h="100%" borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />

                    <Suspense fallback={null}>
                        {autoRotate ? (
                            <RotatingModel
                                modelUrl={`/assets/models/${selectedModel}.glb`}
                                color={selectedColor}
                                rotationSpeed={rotationSpeed}
                            />
                        ) : (
                            <>
                                <Model
                                    modelUrl={`/assets/models/${selectedModel}.glb`}
                                    color={selectedColor}
                                />
                                <OrbitControls enableZoom={true} />
                            </>
                        )}
                        <Environment preset="city" />
                    </Suspense>
                </Canvas>
            </Box>

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

export default LaptopViewer;