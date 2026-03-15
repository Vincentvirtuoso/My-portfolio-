// pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LuHouse,
  LuArrowLeft,
  LuCircleAlert,
  LuTerminal,
  LuBug,
  LuCode,
  LuSearch,
  LuCompass,
} from "react-icons/lu";

const NotFound = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const codeLines = [
    { line: "try {", indent: 0 },
    { line: "  page.exists()", indent: 2 },
    { line: "} catch(error) {", indent: 0 },
    { line: '  throw new NotFoundError("404")', indent: 2 },
    { line: "}", indent: 0 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full"
      >
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Header with gradient */}
          <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500"></div>

          <div className="p-8 md:p-12">
            {/* 404 Code Display */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center mb-8"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    rotate: [0, 5, -5, 0],
                    scale: [1, 1.1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-transparent bg-clip-text"
                >
                  404
                </motion.div>
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: 1,
                  }}
                  className="absolute -top-4 -right-4"
                >
                  <LuBug
                    className="text-purple-500 dark:text-purple-400"
                    size={32}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Error Message */}
            <motion.div variants={itemVariants} className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                Page Not Found
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Oops! The page you're looking for seems to have wandered off
                into the digital wilderness. Let's get you back on track.
              </p>
            </motion.div>

            {/* Fun Code Block */}
            <motion.div
              variants={itemVariants}
              className="bg-gray-900 rounded-lg p-6 mb-8 font-mono text-sm overflow-x-auto"
            >
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-400 text-xs ml-2">error.js</span>
              </div>
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="text-gray-300"
                >
                  <span className="text-gray-500 select-none">{index + 1}</span>
                  <span
                    className="ml-4"
                    style={{ paddingLeft: `${line.indent}ch` }}
                  >
                    {line.indent > 0 && (
                      <span className="text-gray-600">│</span>
                    )}
                    <span
                      className={
                        line.line.includes("404")
                          ? "text-red-400"
                          : "text-gray-300"
                      }
                    >
                      {line.line}
                    </span>
                  </span>
                </motion.div>
              ))}
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-gray-300 mt-2"
              >
                <span className="text-gray-500">6</span>
                <span className="ml-4 text-purple-400">│ &gt; _</span>
              </motion.div>
            </motion.div>

            {/* Suggestions */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
            >
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                <LuSearch
                  className="mx-auto mb-2 text-purple-600 dark:text-purple-400"
                  size={24}
                />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Check the URL
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The path might have a typo
                </p>
              </div>
              <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                <LuCompass
                  className="mx-auto mb-2 text-pink-600 dark:text-pink-400"
                  size={24}
                />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Navigate Back
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use the buttons below
                </p>
              </div>
              <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                <LuTerminal
                  className="mx-auto mb-2 text-orange-600 dark:text-orange-400"
                  size={24}
                />
                <h3 className="font-semibold text-gray-800 dark:text-white mb-1">
                  Report Issue
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  If you think this is a bug
                </p>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all transform hover:scale-105"
              >
                <LuArrowLeft size={18} />
                <span>Go Back</span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
              >
                <LuHouse size={18} />
                <span>Return to Dashboard</span>
              </button>

              <button
                onClick={() => window.location.reload()}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:scale-105"
              >
                <LuCode size={18} />
                <span>Reload Page</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1 }}
          className="fixed top-10 left-10 text-9xl font-bold text-gray-900 dark:text-white select-none pointer-events-none"
          style={{ transform: "rotate(-15deg)" }}
        >
          404
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-10 right-10 text-9xl font-bold text-gray-900 dark:text-white select-none pointer-events-none"
          style={{ transform: "rotate(15deg)" }}
        >
          404
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
