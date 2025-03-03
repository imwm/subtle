const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center">
        {/* Sun Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            darkMode ? "text-gray-400" : "text-yellow-500"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <circle cx="12" cy="12" r="5" strokeWidth="2" />
          <path
            strokeLinecap="round"
            strokeWidth="2"
            d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
          />
        </svg>

        {/* Toggle Switch */}
        <button
          onClick={toggleDarkMode}
          className="relative mx-4 inline-flex h-6 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none"
        >
          <span
            className={`${
              darkMode
                ? "bg-blue-200 translate-x-6"
                : "bg-yellow-300 translate-x-0"
            } inline-block h-6 w-6 transform rounded-full border border-gray-300 shadow-md transition-transform duration-200 ease-in-out z-10`}
          />
          <span
            className={`${
              darkMode ? "bg-gray-600" : "bg-parchment-300"
            } absolute inset-0 rounded-full border-2 border-parchment-400 dark:border-gray-500 shadow-inner transition-colors duration-200`}
          />
        </button>

        {/* Moon Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            darkMode ? "text-blue-200" : "text-gray-400"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>
    </div>
  );
};

export default DarkModeToggle; 