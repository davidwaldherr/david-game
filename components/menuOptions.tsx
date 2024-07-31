"use client";

import { useState, useEffect } from "react";
import { menuOptions } from "@/src/app/data/menuOptions";

// Define MenuOptionType at the top of the file
interface MenuOptionType {
  Title: string;
  Link: string;
  Description: string;
}

const MenuOptions = ({ startIndex, endIndex }: { startIndex: number, endIndex: number }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(menuOptions[startIndex]?.Title || null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [currentMenuOptions, setCurrentMenuOptions] = useState<MenuOptionType[]>(menuOptions.slice(startIndex, endIndex + 1));

  const handleClick = (title: string, link: string) => {
    if (link) {
      window.location.href = `${link}`;
    } else {
      setSelectedOption(title);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % currentMenuOptions.length);
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + currentMenuOptions.length) % currentMenuOptions.length);
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      const selectedOption = currentMenuOptions[selectedIndex];
      handleClick(selectedOption.Title, selectedOption.Link);
    }
  };

  useEffect(() => {
    if (selectedIndex >= 0 && selectedIndex < currentMenuOptions.length) {
      setSelectedOption(currentMenuOptions[selectedIndex].Title);
    }
  }, [selectedIndex, currentMenuOptions]);

  useEffect(() => {
    const handleKeyEvents = (event: KeyboardEvent) => handleKeyDown(event);
    window.addEventListener("keydown", handleKeyEvents);
    return () => {
      window.removeEventListener("keydown", handleKeyEvents);
    };
  }, [handleKeyDown]);

  return (
    <div className="text-4xl">
      {currentMenuOptions.map((option, index) => (
        <div
          key={option.Title}
          onClick={() => handleClick(option.Title, option.Link)}
          className={`cursor-pointer ${
            selectedIndex === index ? "animate-color-change" : "text-white"
          }`}
          style={{ textAlign: 'center', width: '100%' }}
        >
          {option.Title}
        </div>
      ))}
    </div>
  );
};

export default MenuOptions;
