const MealGrid = ({ meals, onMealClick }) => {
  return (
    <div className=" bg-[whitesmoke] mx-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10">
      {meals.map((meal) => (
        <div
          key={meal.idMeal}
          className="meal-card cursor-pointer bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          onClick={() => onMealClick(meal)}
        >
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-center text-lg font-semibold text-gray-800">
              {meal.strMeal}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealGrid;
