import { navBarArray, adminNavBarArray } from "@/consts/navBar";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/theme/ThemeProvider";
import UserDropdown from "./UserDropdown";
import { Toggle } from "../ui/toggle";
import { BiMenu } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import ThemeToggle from "./ThemeToggle";
import { useSelector } from "react-redux";

interface MobileNavBarProps {
  currentPage: string;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ currentPage }) => {
  const [activePage, setActivePage] = useState<string>(currentPage);
  const [openNav, setOpenNav] = useState(false);
  const [navigationArray, setNavigationArray] = useState(navBarArray);

  const isAdmin = useSelector((store: any) => store.user.isAdmin);

  useEffect(() => {
    setNavigationArray(isAdmin ? adminNavBarArray : navBarArray);
  }, [isAdmin]);

  useEffect(() => {
    if (!currentPage) return;

    setActivePage(currentPage);
  }, [currentPage]);

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
        <ThemeToggle />
        <UserDropdown />
      </div>
      <div
        className={`animate__animated ${
          openNav ? `animate__fadeInDown` : `hidden `
        } flex flex-col px-10 py-2 pt-16 z-50 bg-primary border-2 w-full absolute top-0 left-0  text-secondary gap-5 font-bold`}
      >
        {navigationArray.map((navItem, i) => (
          <Link
            key={i}
            className={`${
              activePage.toLowerCase() === navItem.label.toLowerCase() &&
              `bg-secondary text-secondary-foreground`
            }  hover:border-secondary cursor-pointer text-lg px-2 rounded`}
            to={navItem.navTo}
            onClick={() => {
              setActivePage(navItem.label);
              setOpenNav(false);
            }}
          >
            {navItem.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavBar;
