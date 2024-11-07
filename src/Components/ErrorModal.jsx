// ErrorModal.js
import React from "react";

const ErrorModal = ({ message, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-8 mx-4 max-w-md text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">No Meals Found</h2>
      <p className="text-lg mb-6">{message}</p>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default ErrorModal;
