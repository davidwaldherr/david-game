'use client'

import { useEffect, useState } from 'react';
import HomeBackground from "@/components/Backgrounds/HomeBackground";
import MenuOptions from "@/components/menuOptions";

function Options() {
  return (
    <>
      <div className="relative w-full h-screen">
      <HomeBackground />
        <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col w-full pt-10 mx-auto stretch relative items-center shadow-lg h-full w-full" style={{ maxWidth: '560px'}}>
            <h1 className="text-7xl font-regular mb-8 pt-32 text-white">david.game</h1>
            <div className="text-4xl">
              <MenuOptions startIndex={1} endIndex={3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Options;
