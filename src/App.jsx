import React, { useState, useEffect } from "react";
import axios from "axios";
import IngredientInput from "./components/IngredientInput";
import MealGrid from "./components/MealGrid";
import MealModal from "./components/MealModal";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ingredients.length > 0) {
      searchMeals();
    }
  }, [ingredients]);

  const searchMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const mealPromises = ingredients.map((ingredient) =>
        axios.get(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        )
      );

      const responses = await Promise.all(mealPromises);
      const commonMeals = responses.reduce((common, response, index) => {
        const currentMeals = response.data.meals || [];
        if (index === 0) return currentMeals;
        return common.filter((commonMeal) =>
          currentMeals.some((meal) => meal.idMeal === commonMeal.idMeal)
        );
      }, []);

      setMeals(commonMeals);
      if (commonMeals.length === 0) {
        setError("No meals found with all these ingredients");
      }
    } catch (err) {
      setError("Error searching for meals. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Meal Finder by Ingredients
      </h1>
      <IngredientInput
        ingredients={ingredients}
        setIngredients={setIngredients}
        searchMeals={searchMeals}
      />
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {loading ? (
        <div className="text-center text-blue-500 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <MealGrid meals={meals} onMealClick={setSelectedMeal} />
      )}
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default App;
