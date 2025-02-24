"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Text } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { Group } from "three"; // Import Group from three

const AnimatedStars = () => {
  const starsRef = useRef<Group>(null); // Type the ref as Group
  const [speed, setSpeed] = useState(5); // Initial speed
  const [depth, setDepth] = useState(0); // New state for depth
  const [wpm, setWpm] = useState(0); // State to hold words per minute

  // New variable to correlate star movement with WPM
  const starMovementRatio = 0.1; // Adjust this value to change the sensitivity
  const resetDepthThreshold = 100; // Threshold to reset depth
  const wordDisplayTime = 0.5; // Time in seconds to display each word
  const speedMultiplier = 200; // Increase this value to make stars move faster

  useFrame((state, delta) => {
    if (starsRef.current) {
      starsRef.current.rotation.y += 0.0005; // Adjust the rotation speed as needed
      setDepth((prevDepth) => {
        const newDepth = prevDepth + (delta * (speedMultiplier + wpm * starMovementRatio)); // Increase depth based on WPM
        // Reset depth if it exceeds the threshold
        return newDepth > resetDepthThreshold ? 0 : newDepth;
      });
      starsRef.current.position.z = -depth; // Move stars towards the camera
    }
    // Gradually decrease the speed over time
    setSpeed((prevSpeed) => Math.max(1, prevSpeed - delta * 0.1));
  });

  return (
    <group ref={starsRef}>
      <Stars radius={1} depth={35} count={5000} factor={2} saturation={0} fade speed={speed} />
    </group>
  );
};

const HomeBackground = () => {
  const intervalRef = useRef<NodeJS.Timeout>();
  
  const story = `Reframing every webpage on your site as an advertisement fundamentally shifts the design, tone, and function of your website. This strategy moves beyond the traditional role of web pages as static informational hubs and transforms them into dynamic sales tools designed to capture attention, build trust, and drive action.`;
  const [currentWordIndex, setCurrentWordIndex] = useState(0); // Index for the current word
  const [wpm, setWpm] = useState(0); // State to hold words per minute

  useEffect(() => {
    intervalRef.current = setInterval(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % story.split(" ").length); // Cycle through words
        setWpm((prevWpm: number) => Math.round((prevWpm + 120) / 2)); // Update WPM
    }, 200); // Change word every 0.2 seconds for 300 WPM -- 60 WPM is 1 word per second 

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <Canvas className="fixed top-0 left-0 w-full h-full bg-black" style={{ width: '100vw', height: '100vh' }}>
      <AnimatedStars />
      <group position={[0, 0, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={2}
          color="white"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
        >
          {story.split(" ")[currentWordIndex]}
        </Text>
        <Text
          position={[5, -5, 0]}
          fontSize={2}
          color="white"
        >
          {`Words / min = ${wpm}`}
        </Text>
      </group>
    </Canvas>
  );
};

export default HomeBackground;



