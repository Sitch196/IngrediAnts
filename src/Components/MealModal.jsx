import React, { useState, useEffect } from "react";
import axios from "axios";

const MealModal = ({ mealName, onClose }) => {
  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );
        const fetchedMeal = response.data.meals ? response.data.meals[0] : null;
        if (fetchedMeal) {
          setMeal(fetchedMeal);
        } else {
          setError("Meal details not found.");
        }
      } catch (err) {
        setError("Failed to load meal details. Please try again.");
        console.error("Error fetching meal details:", err);
      }
    };

    fetchMealDetails();
  }, [mealName]);

  if (!meal) {
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
    if (meal[`strIngredient${i}`]) {
      ingredients.push({
        ingredient: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
      });
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose} // Close modal when overlay is clicked
    >
      <div
        className="bg-white max-w-lg w-full rounded-lg overflow-hidden shadow-lg transform transition-all p-6 relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal content
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="flex flex-col items-center space-y-4">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            {meal.strMeal}
          </h2>
          <div className="flex space-x-4 text-gray-600 text-sm">
            <span>Category: {meal.strCategory}</span>
            <span>Area: {meal.strArea}</span>
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
            {meal.strInstructions}
          </p>
          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:underline mt-4"
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
