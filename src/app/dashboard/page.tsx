'use client';

import HomeBackground from "@/components/Backgrounds/HomeBackground";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera } from "@react-three/drei";
import { useRef, useMemo, useState } from 'react';
import type { Mesh } from 'three';
import { TextureLoader } from 'three';
import * as THREE from 'three';

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

// Import all 9 face textures in grid order
const faceTextures = [
  '/faces/face1.png', // top left
  '/faces/face2.png', // top middle
  '/faces/face3.png', // top right
  '/faces/face4.png', // middle left
  '/faces/face5.png', // middle middle
  '/faces/face6.png', // middle right
  '/faces/face7.png', // bottom left
  '/faces/face8.png', // bottom middle
  '/faces/face9.png', // bottom right
];

// Add a constant for base rotation speed
const BASE_ROTATION_SPEED = 1;
const HOVER_SPEED_MULTIPLIER = 5;

const Cube = ({ color, index, isHovered }: { color: string; index: number; isHovered: boolean }) => {
  const meshRef = useRef<Mesh>(null);
  
  const lightPosition = useMemo(() => ({
    x: (Math.random() - 0.5) * 10,
    y: (Math.random() - 0.5) * 10,
    z: 5 + Math.random() * 5
  }), []);

  const defaultRotation = useMemo(() => ({
    x: Math.PI / 6,
    y: Math.PI / 4,
    z: 0
  }), []);

  // Create a single material for all faces
  const material = useMemo(() => {
    try {
      const texturePath = faceTextures[index];
      const loadedTexture = useLoader(TextureLoader, texturePath);
      return new THREE.MeshStandardMaterial({
        color: color,
        map: loadedTexture,
        transparent: true,
        opacity: 0.9,
        emissive: color,
        emissiveIntensity: 0.1
      });
    } catch (error) {
      console.error('Error loading texture:', error);
      return new THREE.MeshStandardMaterial({
        color: color,
        transparent: true,
        opacity: 0.9,
        emissive: color,
        emissiveIntensity: 0.1
      });
    }
  }, [index, color]);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const speed = isHovered ? BASE_ROTATION_SPEED * HOVER_SPEED_MULTIPLIER : BASE_ROTATION_SPEED;
      
      if (isHovered) {
        // Only rotate y while maintaining default x and z rotations
        meshRef.current.rotation.x = defaultRotation.x;
        meshRef.current.rotation.y = state.clock.elapsedTime * speed;
        meshRef.current.rotation.z = defaultRotation.z;
      } else {
        // Return to default rotation
        meshRef.current.rotation.x = defaultRotation.x;
        meshRef.current.rotation.y = defaultRotation.y;
        meshRef.current.rotation.z = defaultRotation.z;
      }
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[lightPosition.x, lightPosition.y, lightPosition.z]} 
        intensity={1} 
      />
      <mesh 
        ref={meshRef}
        rotation={[defaultRotation.x, defaultRotation.y, defaultRotation.z]}
        material={material}
      >
        <boxGeometry args={[2, 2, 2]} />
      </mesh>
    </>
  );
};

const DashboardIcon = ({ label, color, index }: { label: string; color: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (index === 0) { // First cube (face1)
      window.open('https://centaurseo.com', '_blank');
    } else if (index === 1) { // Second cube (face2)
      window.location.href = '/dashboard/strava';
    }
  };

  return (
    <div 
      className="aspect-square w-full max-w-[200px] max-h-[200px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
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
        <Cube color={color} index={index} isHovered={isHovered} />
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
