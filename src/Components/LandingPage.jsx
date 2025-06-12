import React, { useState } from "react";
import landing from "../assets/landing.png";
import logo from "../assets/logo-new.png";

const LandingPage = ({ onStart }) => {
  const [showInstruction, setShowInstruction] = useState(false);
  const handleInstruction = () => {
    setShowInstruction(!showInstruction);
  };
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={landing}
        alt="Landing background"
      />
      <div className="absolute  top-4 left-0 right-0 z-10 flex justify-between items-center px-4 md:px-8">
        <img src={logo} alt="Logo" className="h-12 md:h-16" />
        <button onClick={handleInstruction} className="focus:outline-none">
          <span
            role="img"
            aria-label="Instructions"
            className="text-3xl md:text-4xl"
          >
            ❔
          </span>
        </button>
      </div>
      ={" "}
      {showInstruction && (
        <div
          onClick={() => setShowInstruction(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-11/12 relative text-gray-800 animate-fade-in">
            <button
              onClick={handleInstruction}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
              How to use IngrediAnts
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-base">
              <li>
                Type an ingredient in the input box and press <b>Enter</b> or{" "}
                <b>comma</b> to add it.
              </li>
              <li>Add as many ingredients as you want, one by one.</li>
              <li>
                Click <b>Search Meals</b> to find recipes using all your
                ingredients.
              </li>
              <li>Click on a meal to see its details and recipe.</li>
              <li>
                Remove ingredients by clicking the <b>×</b> next to them.
              </li>
            </ul>
          </div>
        </div>
      )}
      <div className="text-center text-white z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 shadow-lg">
          Find Meals By Ingredients
        </h1>
        <button
          onClick={onStart}
          className="px-6 py-3 bg-white text-black font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
