'use client'

import HomeBackground from "@/components/Backgrounds/HomeBackground";
import MenuOptions from "@/components/menuOptions";
import LevelOptions from "@/components/Levels/levelOptions";

function Levels() {
  return (
    <>
      <div className="relative w-full h-screen">
        {/* <HomeBackground /> */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col w-full pt-10 mx-auto stretch relative bg-black items-center border-2 border-white rounded-lg shadow-lg" style={{ height: '90%', width: '90%', maxWidth: '600px', boxShadow: '0 0 10px 10px white' }}>
            <LevelOptions />
          </div>
        </div>
      </div>
    </>
  );
}

export default Levels;