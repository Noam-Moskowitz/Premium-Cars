import { navBarArray, adminNavBarArray } from "@/consts/navBar";
import { FiMoon, FiSun } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import UserDropdown from "./UserDropdown";
import { Switch } from "@/components/ui/switch";
import { useSelector } from "react-redux";

interface DesktopNavBarProps {
  currentPage: string;
}

const DesktopNavBar: React.FC<DesktopNavBarProps> = ({ currentPage }) => {
  const { setTheme, theme } = useTheme();
  const isAdmin = useSelector((store: any) => store.user.isAdmin);

  const [navigationArray, setNavigationArray] = useState(navBarArray);
  const [activePage, setActivePage] = useState<string>(currentPage);

  useEffect(() => {
    setNavigationArray(isAdmin ? adminNavBarArray : navBarArray);
  }, [isAdmin]);

  return (
    <nav className="w-full h-16 bg-primary shadow-md flex justify-between">
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
        <div
          className="relative cursor-pointer"
          onClick={() => setTheme(theme == `light` ? `dark` : `light`)}
        >
          <Switch checked={theme == `dark` ? true : false} />
          {theme == `dark` ? (
            <FiSun
              size={20}
              className="absolute left-0.5 top-1/2 transform -translate-y-1/2 pb-1"
            />
          ) : (
            <FiMoon
              size={20}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 pb-1"
            />
          )}
        </div>

        <UserDropdown />
      </div>
    </nav>
  );
};

export default DesktopNavBar;
