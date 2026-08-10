"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;

    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");

    setDark(newDark);
  };

  return (
    <button
      onClick={toggleTheme}
      className="
        fixed
        bottom-6
        right-6
        z-50
        size-12
        rounded-full
        bg-primary
        text-primary-foreground
        shadow-lg
        flex
        items-center
        justify-center
        cursor-pointer
        select-none
      "
      aria-label="Toggle theme"
    >
      {dark ? "☀️" : "🌙"}
    </button>
  );
}