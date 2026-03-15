import React from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";

const ErrorAlert = ({ message, onRetry }) => {
  return (
    <div className="bg-red-500/10 border border-red-500 rounded-2xl p-8 max-w-md mx-auto text-center">
      <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-red-500 mb-2">Error</h3>
      <p className="text-gray-400 mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <FaRedo />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorAlert;
