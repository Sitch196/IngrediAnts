import React, { useState } from "react";

const IngredientInput = ({ ingredients, setIngredients, searchMeals }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newIngredient = inputValue.trim().toLowerCase();
      if (newIngredient && !ingredients.includes(newIngredient)) {
        setIngredients([...ingredients, newIngredient]);
        setInputValue("");
      }
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 mb-6 bg-[whitesmoke] p-4">
      <p className="text-gray-600 text-center">
        Add ingredients one by one: type and press Enter or comma
      </p>
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {ingredients.map((ingredient, index) => (
          <span
            key={index}
            className="flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium shadow-sm"
          >
            {ingredient}
            <button
              onClick={() => removeIngredient(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type one ingredient and press Enter"
          className="flex-grow border border-gray-300 bg-white p-2 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold shadow-md"
          onClick={searchMeals}
        >
          Search Meals
        </button>
      </div>
    </div>
  );
};

export default IngredientInput;
