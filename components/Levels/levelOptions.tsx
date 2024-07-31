import React from 'react';
import { CardType } from '@/types/customTypes';

type CardTypeComponentProps = {
  card: CardType;
};

const CardTypeComponent: React.FC<CardTypeComponentProps> = ({ card }) => {
  return (
    <div className="flex flex-col w-full h-full p-6 mx-auto stretch relative bg-black items-center border-2 border-white rounded-lg">
      <h1 className="text-8xl font-regular mb-8 pt-32 text-white">{card.Title}</h1>
      <img src={card.Logo} alt={`${card.Title} logo`} className="mb-4" />
      <p className="text-4xl text-white">{card.Description}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default CardTypeComponent;
