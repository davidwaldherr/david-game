import React from 'react';
import { cardLevels } from '@/src/app/data/levelOptions';

const LevelOptions = () => {
  const card = cardLevels[0];

  return (
    <div className="card">
      <h1>{card.Title}</h1>
      <img src={card.Logo} alt={`${card.Title} logo`} />
      <p><strong>Category:</strong> {card.Category}</p>
      <p><strong>Type:</strong> {card.Type}</p>
      <p><strong>Description:</strong> {card.Description}</p>
      <p><strong>Background Story:</strong> {card.BackgroundStory}</p>
      <p><strong>Animation:</strong> {card.Animation}</p>
      <p><strong>Color Scheme:</strong> {card.ColorScheme}</p>
      <p><strong>Pixel Border:</strong> {card.PixelBorder}</p>
      <div>
        <h2>Options:</h2>
        {card.Options.length > 0 ? (
          <ul>
            {card.Options.map((option, index) => (
              <li key={index}>
                <p><strong>Title:</strong> {option.Title}</p>
                <p><strong>Link:</strong> {option.Link}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No options available</p>
        )}
      </div>
    </div>
  );
};

export default LevelOptions;
