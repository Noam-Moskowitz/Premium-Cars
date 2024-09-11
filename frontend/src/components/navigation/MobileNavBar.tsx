import { navBarArray /* adminNavBarArray */ } from "@/consts/navBar";
import { FiMoon, FiSun } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import UserDropdown from "./UserDropdown";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "../ui/toggle";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

interface MobileNavBarProps {
  currentPage: string;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ currentPage }) => {
  const { setTheme, theme } = useTheme();

  const [activePage, setActivePage] = useState<string>(currentPage);
  const [openNav, setOpenNav] = useState(false);

  return (
    <nav className="w-full h-16 bg-primary shadow-md flex items-center justify-between z-50">
      <div className="border-2 rounded-lg ml-3 z-[100]">
        <Toggle onClick={() => setOpenNav(!openNav)}>
          {openNav ? (
            <IoMdClose className="animate__animated animate__rotateIn" size={25} />
          ) : (
            <BiMenu size={25} />
          )}
        </Toggle>
      </div>
      <div className="flex items-center px-5 gap-5">
        <div className="relative">
          <Switch
            checked={theme == `dark` ? true : false}
            onClick={() => setTheme(theme == `light` ? `dark` : `light`)}
          />
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
      <div
        className={`animate__animated ${
          openNav ? `animate__fadeInDown` : `hidden `
        } flex flex-col px-10 py-2 pt-16 z-50 bg-primary border-2 w-full absolute top-0 left-0  text-secondary gap-5 font-bold`}
      >
        {navBarArray.map((navItem, i) => (
          <Link
            key={i}
            className={`${
              activePage.toLowerCase() === navItem.label.toLowerCase() &&
              `bg-secondary text-secondary-foreground`
            }  hover:border-secondary cursor-pointer text-lg px-2 rounded`}
            to={navItem.navTo}
            onClick={() => setActivePage(navItem.label)}
          >
            {navItem.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavBar;
