import { navBarArray, adminNavBarArray } from "@/consts/navBar";
import { FiMoon, FiSun } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";

const NavBar = () => {
  const { setTheme } = useTheme();

  const [activePage, setActivePage] = useState<string>(`Home`);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (darkMode) {
      setTheme(`dark`);
    } else {
      setTheme(`light`);
    }
  }, [darkMode]);

  return (
    <nav className="w-full h-16 bg-primary shadow-md flex justify-between">
      <div className="flex gap-10">
        <img
          className="p-1"
          src={darkMode ? "/images/logo-dark-mode.png" : "/images/logo.png"}
          alt="Company Logo"
        />
        <div className="flex py-2 h-full items-end text-secondary gap-8 font-bold">
          {navBarArray.map((navItem, i) => (
            <Link
              key={i}
              className={`${
                activePage === navItem.label && `border-secondary`
              } border-b-4 border-primary hover:border-secondary cursor-pointer`}
              to={navItem.navTo}
              onClick={() => setActivePage(navItem.label)}
            >
              {navItem.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center px-5 gap-5">
        <div
          onClick={() => setDarkMode(!darkMode)}
          className="border-2 border-secondary p-2 rounded cursor-pointer"
        >
          {darkMode ? (
            <FiSun size={18} className="text-primary-foreground" />
          ) : (
            <FiMoon size={18} className="text-primary-foreground" />
          )}
        </div>
        <div className="border-2 border-secondary p-2 rounded-full cursor-pointer ">
          <FiUser size={18} className="text-secondary" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
