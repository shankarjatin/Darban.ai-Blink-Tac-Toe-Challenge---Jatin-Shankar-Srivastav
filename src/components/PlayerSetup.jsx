import React from 'react';

export default function PlayerSetup({
  emojiCategories,
  nameInputs,
  setNameInputs,
  handleCategorySelect,
  saveNames,
}) {
  return (
    <div className="space-y-4">
      {[0, 1].map(i => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Player {i + 1}</h2>
          <input
            type="text"
            placeholder={`Enter name for Player ${i + 1}`}
            className="w-full border p-2 rounded mb-2"
            value={nameInputs[i]}
            onChange={e => {
              const newNames = [...nameInputs];
              newNames[i] = e.target.value;
              setNameInputs(newNames);
            }}
          />
          <div className="flex gap-2 flex-wrap">
            {Object.entries(emojiCategories).map(([key, emojis]) => (
              <button
                key={key}
                onClick={() => handleCategorySelect(i, key)}
                className="border px-3 py-1 rounded hover:bg-gray-100"
              >
                {key}: {emojis.join(' ')}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button
        onClick={saveNames}
        className="w-full py-2 bg-green-600 text-white rounded shadow hover:bg-green-700"
      >
        Start Game
      </button>
    </div>
  );
}
