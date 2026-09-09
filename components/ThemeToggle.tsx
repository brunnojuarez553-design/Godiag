"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(current);
  }, []);

  useEffect(() => {
    const syncMenuLock = () => {
      window.requestAnimationFrame(() => {
        const menuOpen = document.querySelector(".nav nav")?.classList.contains("open");
        document.body.classList.toggle("mobile-menu-open", Boolean(menuOpen));
      });
    };

    document.addEventListener("click", syncMenuLock, true);
    window.addEventListener("resize", syncMenuLock, { passive: true });
    syncMenuLock();

    return () => {
      document.removeEventListener("click", syncMenuLock, true);
      window.removeEventListener("resize", syncMenuLock);
      document.body.classList.remove("mobile-menu-open");
    };
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      window.localStorage.setItem("godiag-theme", next);
    } catch {}
  };

  const isLight = theme === "light";

  return (
    <button
      type="button"
      className={`theme-toggle${isLight ? " is-light" : ""}`}
      onClick={toggleTheme}
      aria-label={isLight ? "Activar modo noche" : "Activar modo día"}
      aria-pressed={isLight}
      title={isLight ? "Modo día" : "Modo noche"}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <Sun className="theme-toggle-sun" size={14} />
        <Moon className="theme-toggle-moon" size={14} />
        <span className="theme-toggle-knob" />
      </span>
      <span className="theme-toggle-label">{isLight ? "Día" : "Noche"}</span>
    </button>
  );

}
