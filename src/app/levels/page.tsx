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
              <LevelOptions />
        </div>
      </div>
    </>
  );
}

export default Levels;