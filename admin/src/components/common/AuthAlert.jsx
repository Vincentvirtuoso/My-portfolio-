import { LuX } from "react-icons/lu";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";

const AuthAlert = () => {
  const { authError, clearError } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (authError) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);

      const timer = setTimeout(() => {
        handleClose();
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [authError]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      clearError();
    }, 300);
  };

  if (!shouldRender) return null;

  const bgColor = "bg-red-600";
  const buttonBg = "bg-red-800 hover:bg-red-900";

  return (
    <div
      className={`
        fixed bottom-5 right-5 z-50 w-full max-w-sm sm:max-w-md
        transition-all duration-300 ease-in-out transform
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
      `}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`
        ${bgColor} text-white px-4 sm:px-6 py-3 sm:py-4 
        rounded-lg shadow-2xl flex items-start gap-3 sm:gap-4
        border-l-4 border-white
      `}
      >
        <div className="flex-shrink-0 mt-0.5">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <div className="flex-1 text-sm sm:text-base font-medium break-words">
          {authError}
        </div>

        <button
          onClick={handleClose}
          className={`
            flex-shrink-0 font-bold ${buttonBg} 
            px-2 py-1 rounded transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2
            focus:ring-offset-transparent
          `}
          aria-label="Close alert"
        >
          <LuX className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="relative h-1 mt-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`
            absolute left-0 top-0 h-full transition-all duration-[5000ms] ease-linear
            bg-red-400
          `}
          style={{
            width: isVisible ? "0%" : "100%",
            transition: isVisible ? "width 5000ms linear" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default AuthAlert;
