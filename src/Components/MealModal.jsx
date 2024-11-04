import React, { useState, useEffect } from "react";
import axios from "axios";

const MealModal = ({ meal, onClose }) => {
  const [mealDetails, setMealDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal.strMeal}`
        );
        const fetchedMeal = response.data.meals ? response.data.meals[0] : null;
        setMealDetails(fetchedMeal);
      } catch (err) {
        setError("Failed to load meal details. Please try again.");
        console.error("Error fetching meal details:", err);
      }
    };

    fetchMealDetails();
  }, [meal]);

  if (!mealDetails) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white max-w-lg w-full rounded-lg p-6">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-gray-500">Loading...</p>
          )}
        </div>
      </div>
    );
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (mealDetails[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: mealDetails[`strIngredient${i}`],
        measure: mealDetails[`strMeasure${i}`],
      });
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-lg p-6 relative custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-1 right-1 text-gray-500  hover:text-gray-700 text-2xl font-bold transform hover:scale-110 transition-transform"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={mealDetails.strMealThumb}
            alt={mealDetails.strMeal}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {mealDetails.strMeal}
          </h2>
          <div className="flex flex-wrap justify-center gap-4 text-gray-600 text-sm">
            <span>Category: {mealDetails.strCategory}</span>
            <span>Area: {mealDetails.strArea}</span>
          </div>
          <h3 className="text-xl font-medium text-gray-800">Ingredients:</h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing, index) => (
              <div
                key={index}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm"
              >
                {ing.ingredient}: {ing.measure}
              </div>
            ))}
          </div>
          <h3 className="text-xl font-medium text-gray-800">Instructions:</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            {mealDetails.strInstructions}
          </p>
          {mealDetails.strYoutube && (
            <a
              href={mealDetails.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 text-white px-2 py-1 rounded-md hover:underline mt-4"
            >
              Watch on YouTube
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealModal;
