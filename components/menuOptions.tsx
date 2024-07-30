"use client";

import { useState } from "react";
import { menuOptions } from "@/src/app/data/menuOptions";

const MenuOptions = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setSelectedOption(title);
  };

  return (
    <div>
      {menuOptions.map((option) => (
        <p
          key={option.Title}
          onClick={() => handleClick(option.Title)}
          className={`cursor-pointer ${
            selectedOption === option.Title ? "animate-color-change" : "text-dark-blue"
          }`}
        >
          {option.Title}
        </p>
      ))}
    </div>
  );
};

export default MenuOptions;
