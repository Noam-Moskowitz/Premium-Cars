import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";

const NavBarWarpper = () => {
  return (
    <div>
      <div className="hidden md:block">
        <DesktopNavBar />
      </div>
      <div className="md:hidden">
        <MobileNavBar />
      </div>
    </div>
  );
};

export default NavBarWarpper;
