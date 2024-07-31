import HomeBackground from "@/components/Backgrounds/HomeBackground";
import MenuOptions from "@/components/menuOptions";
import dynamic from 'next/dynamic';

const CanvasComponent = dynamic(() => import('@/components/Levels/CanvasComponent'), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="relative w-full h-screen">
        <HomeBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col w-full p-6 mx-auto stretch relative bg-black items-center border-2 border-white rounded-lg" style={{ height: '90%', width: '90%', maxWidth: '600px' }}>
            <h1 className="text-6xl font-regular mb-8 text-white pt-30">🕹️ david.game</h1>
            <MenuOptions />
          </div>
        </div>
      </div>
    </>
  );
}
