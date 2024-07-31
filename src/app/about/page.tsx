'use client'

import { useEffect } from 'react';
import HomeBackground from "@/components/Backgrounds/HomeBackground";

function About() {
  useEffect(() => {
    const handleNavigation = () => {
      window.location.href = '/options';
    };

    window.addEventListener('keydown', handleNavigation);
    window.addEventListener('click', handleNavigation);

    return () => {
      window.removeEventListener('keydown', handleNavigation);
      window.removeEventListener('click', handleNavigation);
    };
  }, []);

  return (
    <>
      <div className="relative w-full h-screen">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col w-full pt-10 mx-auto stretch relative bg-black items-center neon-box" style={{ height: '90%', width: '90%', maxWidth: '560px' }}>
            <h1 className="text-white text-center text-6xl p-5 pt-28">
              <strong>design the game you want to play.</strong><br /><br />-david
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
