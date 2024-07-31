'use client'

import HomeBackground from "@/components/Backgrounds/HomeBackground";
import MenuOptions from "@/components/menuOptions";

function Option1() {
  return (
    <>
      <div className="relative w-full h-screen">
        <HomeBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col w-full pt-10 mx-auto stretch relative bg-black items-center border-2 border-white rounded-lg neon-box" style={{ height: '90%', width: '90%', maxWidth: '600px' }}>
            <h1 className="text-7xl font-regular mb-8 pt-32 text-white">david.game</h1>
            <div className="text-4xl">
              <MenuOptions />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Option1;