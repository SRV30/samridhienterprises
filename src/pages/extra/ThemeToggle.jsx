import React, { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa"; // For moon/sun icons

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check if dark mode is preferred in the user's system or local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle the theme on button click
  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode); // Add/remove the dark class

    // Save the theme in local storage so it persists
    localStorage.setItem('theme', newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-lg rounded-full focus:outline-none"
    >
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </button>
  );
};

export default ThemeToggle;
