"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef, useState } from "react";
import { Group } from "three"; // Import Group from three

const AnimatedStars = () => {
  const starsRef = useRef<Group>(null); // Type the ref as Group
  const [speed, setSpeed] = useState(5); // Initial speed

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005; // Adjust the rotation speed as needed
    }
    // Gradually decrease the speed over time
    setSpeed((prevSpeed) => Math.max(1, prevSpeed - delta * 0.1));
  });

  return (
    <group ref={starsRef}>
      <Stars radius={1} depth={35} count={500} factor={4} saturation={0} fade speed={speed} />
    </group>
  );
};

const HomeBackground = () => {
  return (
    <Canvas className="fixed top-0 left-0 w-full h-full bg-black">
      <AnimatedStars />
    </Canvas>
  );
};

export default HomeBackground;



