'use client';

import { Canvas } from '@react-three/fiber';
import { Html, Plane, OrbitControls } from '@react-three/drei';
import MenuOptions from "@/components/menuOptions";

export default function CanvasComponent() {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[2, 5, 5]}
        intensity={1}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Plane receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} args={[10, 10]}>
        <shadowMaterial opacity={0.5} />
      </Plane>
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[3, 1, 0.1]} />
        <meshStandardMaterial color="black" />
        <Html position={[0, 0, 0.06]} transform occlude>
          <div className="flex flex-col w-full p-6 mx-auto stretch relative bg-white items-center border-2 border-white rounded-lg" style={{ height: '90%', width: '90%', maxWidth: '600px' }}>
            <h1 className="text-6xl font-regular mb-8 text-white pt-30">🕹️ david.game</h1>
            <MenuOptions />
          </div>
        </Html>
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}

