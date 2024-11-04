import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import IngredientInput from "./components/IngredientInput";
import MealGrid from "./components/MealGrid";
import MealModal from "./components/MealModal";
import LandingPage from "./Components/LandingPage";

const App = () => {
  const [ingredients, setIngredients] = useState([]);
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const inputRef = useRef(null);
  const mealGridRef = useRef(null);

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
      } else {
        if (mealGridRef.current) {
          mealGridRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }
    } catch (err) {
      setError("Error searching for meals. Please try again.");
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStart = () => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container mx-auto">
      <LandingPage onStart={handleStart} />
      <div ref={inputRef}>
        <IngredientInput
          ingredients={ingredients}
          setIngredients={setIngredients}
          searchMeals={searchMeals}
        />
      </div>
      {error && <div className="text-red-500 text-center mt-4">{error}</div>}
      {loading ? (
        <div className="text-center text-blue-500 text-lg font-semibold">
          Loading...
        </div>
      ) : (
        <div ref={mealGridRef}>
          <MealGrid meals={meals} onMealClick={setSelectedMeal} />
        </div>
      )}
      {selectedMeal && (
        <MealModal meal={selectedMeal} onClose={() => setSelectedMeal(null)} />
      )}
    </div>
  );
};

export default App;
