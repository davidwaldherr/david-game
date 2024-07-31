"use client";

import { useState, useEffect } from "react";
import { menuOptions } from "@/src/app/data/menuOptions";

const MenuOptions = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(menuOptions[0]?.Title || null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleClick = (title: string) => {
    setSelectedOption(title);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % menuOptions.length);
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + menuOptions.length) % menuOptions.length);
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0) {
      setSelectedOption(menuOptions[selectedIndex].Title);
    }
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      {menuOptions.map((option, index) => (
        <p
          key={option.Title}
          onClick={() => handleClick(option.Title)}
          className={`cursor-pointer ${
            selectedOption === option.Title ? "animate-color-change" : "text-white"
          }`}
        >
          {option.Title}
        </p>
      ))}
    </div>
  );
};

export default MenuOptions;
