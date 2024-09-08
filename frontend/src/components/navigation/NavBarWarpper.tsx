import React from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavBar from "./MobileNavBar";
import { useLocation } from "react-router-dom";
import { determineNavRoute } from "@/utils/utls";

const NavBarWarpper = () => {
  const location = useLocation();

  const activePage = determineNavRoute(location.pathname);
  return (
    <div>
      <div className="hidden md:block">
        <DesktopNavBar currentPage={activePage} />
      </div>
      <div className="md:hidden">
        <MobileNavBar currentPage={activePage} />
      </div>
    </div>
  );
};

export default NavBarWarpper;
