import { useState, useEffect } from "react";
import DarkModeToggle from "./components/DarkModeToggle";
import YouTubeEmbed from "./components/YouTubeEmbed";

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
      <div className="mx-auto py-4">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full py-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-dark-text">
              Subtle
            </h1>
            <DarkModeToggle
              darkMode={darkMode}
              toggleDarkMode={toggleDarkMode}
            />
          </div>

          <HotBox>
            <div className="w-full">
              <p className="mb-4">
                <b>Subtle</b> is a project based on these observations:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Language models will commoditize knowledge work.</li>
                <li>
                  Resourceful, inspired individuals will increasingly outperform
                  teams.
                </li>
                <li>
                  The supply of software will grow by an order of magnitude at
                  least.
                </li>
              </ul>
              <p className="mb-4">
                We flesh out these ideas, highlight products that exemplify
                them, and announce our own products in Subtle Research, our
                newsletter.
              </p>
            </div>
          </HotBox>

          <HotBox>
            <iframe
              src="https://subtleresearch.substack.com/embed"
              height="150"
              className="bg-parchment-50 dark:bg-dark-box border-2 border-gray-300 rounded-lg w-full"
              frameborder="0"
            ></iframe>
          </HotBox>

          <HotBox>
            <YouTubeEmbed videoId="JTdl3yFCHY4" />
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
      className={`w-full flex items-center justify-center mx-auto py-4 bg-parchment-${boxShade} dark:bg-dark-box text-gray-800 dark:text-dark-text transition-colors duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default App;
