import Image from "next/image";
import MenuOptions from "@/components/menuOptions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute inset-0 bg-black flex items-center justify-center">
        <div className="flex flex-col w-full p-6 mx-auto stretch relative bg-black items-center border-2 border-white rounded-lg" style={{ height: '90%', width: '90%', maxWidth: '600px' }}>
          <h1 className="text-6xl font-regular mb-8 text-white pt-30">🕹️ david.game</h1>
          <MenuOptions />
        </div>
      </div>
    </main>
  );
}
