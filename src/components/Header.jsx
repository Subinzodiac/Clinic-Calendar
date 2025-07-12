import { Link } from "react-router-dom";
import "./Header.css";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa";
import { useState, useEffect } from "react";
export default function Header() {
    const [isDark, setIsDark] = useState(document.body.classList.contains("dark"));

    const toggleTheme = () => {
      document.body.classList.toggle("dark");
      const theme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", theme);
      setIsDark(theme === "dark");
    };

  return (
    <header className="header">
      <nav className="nav">
        <div className="left-links">
          <Link to="/calendar" className="nav-link">Calendar</Link>
          <Link to="/add-appointment" className="nav-link">Add Appointment</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
  {isDark ? <FaRegLightbulb /> : <FaLightbulb />}
</button>
      </nav>
    </header>
  );
}
