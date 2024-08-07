'use client';

import { useEffect, useState } from 'react';
import HomeBackground from "@/components/Backgrounds/HomeBackground";
import MenuOptions from "@/components/menuOptions";
import Image from '@/src/app/Images/120x120.png';

function Home() {
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <>
      <div className="relative w-full h-screen bg-black">
      {/* // Background */}
        <HomeBackground /> 
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={` h-full w-full flex flex-col w-full pt-10 mx-auto stretch relative items-center shadow-lg transition-opacity duration-1000 ${textVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              maxWidth: '560px',
            }}
          >
            <h1 className={`text-7xl font-regular mb-8 pt-32 text-white transition-opacity duration-1000 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
              david.game
            </h1>
            <div className={`text-4xl transition-opacity duration-1000 ${textVisible ? 'opacity-100' : 'opacity-0'}`}>
              <MenuOptions startIndex={0} endIndex={0} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
