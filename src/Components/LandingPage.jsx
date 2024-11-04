import React from "react";
import landing from "../assets/landing.png";
import logo from "../assets/logo-new.png"; // Adjust the path as necessary

const LandingPage = ({ onStart }) => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${landing})`,
        }}
      />

      {/* Logo at the top left */}
      <div className="absolute top-4 left-4 z-10">
        {" "}
        {/* Ensure the logo is above the background */}
        <img src={logo} alt="Logo" className="h-16" />
      </div>

      {/* Text content */}
      <div className="text-center text-white z-10">
        {" "}
        {/* Ensure the text is above the background */}
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
