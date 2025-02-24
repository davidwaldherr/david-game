'use client';

import HomeBackground from "@/components/Backgrounds/HomeBackground";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef, useMemo, useState, Suspense } from 'react';
import type { Mesh } from 'three';
import { TextureLoader } from 'three';

const colors = [
  '#FF6B6B', // coral red
  '#4ECDC4', // turquoise
  '#45B7D1', // sky blue
  '#96CEB4', // sage green
  '#FFEEAD', // cream yellow
  '#D4A5A5', // dusty rose
  '#9B59B6', // purple
  '#3498DB', // blue
  '#E67E22', // orange
];

// Import all 8 face textures
const faceTextures = [
  '/images/faces/face1.png',
  '/images/faces/face2.png',
  '/images/faces/face3.png',
  '/images/faces/face4.png',
  '/images/faces/face5.png',
  '/images/faces/face6.png',
  '/images/faces/face7.png',
  '/images/faces/face8.png',
];

// Add a constant for base rotation speed
const BASE_ROTATION_SPEED = 0.3;
const HOVER_SPEED_MULTIPLIER = 5;

const Cube = ({ color, index, isHovered }: { color: string; index: number; isHovered: boolean }) => {
  const meshRef = useRef<Mesh>(null);
  
  // Improved texture loading with error logging
  const texture = useMemo(() => {
    try {
      const texturePath = faceTextures[index % faceTextures.length];
      console.log('Loading texture:', texturePath); // Debug log
      return useLoader(TextureLoader, texturePath);
    } catch (error) {
      console.error('Error loading texture:', error);
      return null;
    }
  }, [index]);

  // Use synchronized rotation with hover effect
  useFrame((state, delta) => {
    if (meshRef.current) {
      const speed = isHovered ? BASE_ROTATION_SPEED * HOVER_SPEED_MULTIPLIER : BASE_ROTATION_SPEED;
      
      if (isHovered) {
        // Only rotate on Y axis when hovered
        meshRef.current.rotation.y = state.clock.elapsedTime * speed;
      } else {
        // Normal rotation on all axes when not hovered
        meshRef.current.rotation.x = state.clock.elapsedTime * speed;
        meshRef.current.rotation.y = state.clock.elapsedTime * speed;
        meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.5;
      }
    }
  });

  return (
    <>
      {/* Increased ambient light */}
      <ambientLight intensity={2} />
      {/* Front light */}
      <directionalLight position={[0, 5, 5]} intensity={2} />
      {/* Back light */}
      <directionalLight position={[0, -5, -5]} intensity={2} />
      <mesh 
        ref={meshRef}
        rotation={[0, 0, 0]}
      >
        <boxGeometry args={[2, 2, 2]} />
        {[0, 1, 2, 3, 4, 5].map((_, i) => (
          <meshStandardMaterial
            key={i}
            attach={`material-${i}`}
            color={color}
            map={texture}
            transparent={true}
            opacity={0.9}
            emissive={color}
            emissiveIntensity={0.2}
          />
        ))}
      </mesh>
    </>
  );
};

const DashboardIcon = ({ label, color, index }: { label: string; color: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="aspect-square w-full max-w-[200px] max-h-[200px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        style={{ background: 'transparent' }}
      >
        <OrthographicCamera
          makeDefault
          position={[0, 0, 7]}
          zoom={50}
          near={0.1}
          far={1000}
        />
        <Suspense fallback={null}>
          <Cube color={color} index={index} isHovered={isHovered} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};

export default function Dashboard() {
  const icons = Array.from({ length: 9 }, (_, i) => ({
    label: `Icon ${i + 1}`,
    color: colors[i]
  }));

  return (
    <>
      <div className="relative w-full h-screen">
        <HomeBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-[700px] p-8">
            <div className="grid grid-cols-3 gap-8 w-full place-items-center">
              {icons.map((icon, index) => (
                <DashboardIcon 
                  key={index} 
                  label={icon.label} 
                  color={icon.color}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
