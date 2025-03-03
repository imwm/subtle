import { useState, useEffect } from "react";
import DarkModeToggle from "./components/DarkModeToggle";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Check system preference on initial load
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-parchment-100 dark:bg-dark-box transition-colors duration-100">
      <div className="mx-auto">
        <div className="w-full flex flex-col items-center justify-center">
          <HotBox shade="200">
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </HotBox>

          <HotBox shade="50">
            <h1 className="text-3xl font-bold text-center">Subtle</h1>
          </HotBox>

          <HotBox>
            <h2 className="text-lg font-medium">HotBox 1</h2>
          </HotBox>

          <HotBox>
            <h2 className="text-lg font-medium">HotBox 2</h2>
          </HotBox>

          <HotBox>
            <h2 className="text-lg font-medium">HotBox 3</h2>
          </HotBox>
        </div>
      </div>
    </div>
  );
}

const HotBox = ({ children, className = "", shade }) => {
  // Generate a random shade if not provided
  // Use a wider range of shades (10-500)
  const [boxShade] = useState(shade || Math.floor(Math.random() * 50) * 10);

  return (
    <div
      className={`w-full max-w-md mx-auto p-4 bg-parchment-${boxShade} dark:bg-dark-box text-gray-800 dark:text-dark-text transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default App;
