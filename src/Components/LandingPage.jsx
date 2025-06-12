import React from "react";
import landing from "../assets/landing.png";
import logo from "../assets/logo-new.png";

const LandingPage = ({ onStart }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={landing}
        alt="Landing background"
      />

      <div className="absolute top-4 left-4 z-10">
        {" "}
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      <div className="text-center text-white z-10">
        {" "}
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
