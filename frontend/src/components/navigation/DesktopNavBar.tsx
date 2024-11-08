import { navBarArray, adminNavBarArray } from "@/consts/navBar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import UserDropdown from "./UserDropdown";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

interface DesktopNavBarProps {
  currentPage: string;
}

const DesktopNavBar: React.FC<DesktopNavBarProps> = ({ currentPage }) => {
  const { theme } = useTheme();
  const isAdmin = useSelector((store: any) => store.user.isAdmin);

  const [navigationArray, setNavigationArray] = useState(navBarArray);
  const [activePage, setActivePage] = useState<string>(currentPage);

  useEffect(() => {
    setNavigationArray(isAdmin ? adminNavBarArray : navBarArray);
  }, [isAdmin]);

  return (
    <nav className="w-full fixed z-[100] h-16 bg-primary shadow-md flex justify-between">
      <div className="flex gap-10">
        <img
          className="p-1"
          src={theme == `dark` ? "/images/logo-dark-mode.png" : "/images/logo.png"}
          alt="Company Logo"
        />
        <div className="flex py-2 h-full items-end text-secondary gap-8 font-bold">
          {navigationArray.map((navItem, i) => (
            <Link
              key={i}
              className={`${
                activePage.toLowerCase() === navItem.label.toLowerCase() && `border-secondary`
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
        <ThemeToggle />
        <UserDropdown />
      </div>
    </nav>
  );
};

export default DesktopNavBar;
