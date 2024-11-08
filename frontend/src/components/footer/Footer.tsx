import React from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="bg-primary  shadow-lg border-t-8 text-background ">
      <div className="flex justify-around p-3">
        <div>
          <div className="p-3">
            <h6>We Accept:</h6>
            <div className="flex gap-5">
              <FaCcMastercard size={40} />
              <FaCcVisa size={40} />
            </div>
          </div>
          <div className="flex items-center">
            <h6>Ready to Get Started?</h6>
            <Button variant="ghost" className="underline">
              Sign Up
            </Button>
          </div>
        </div>

        <div>
          <h6 className="font-bold">Sitemap:</h6>
          <ul className="underline list-disc list-inside ">
            <li className="cursor-pointer hover:opacity-55">Home</li>
            <li className="cursor-pointer hover:opacity-55">My Orders</li>
            <li className="cursor-pointer hover:opacity-55">About</li>
            <li className="cursor-pointer hover:opacity-55">Log In</li>
            <li className="cursor-pointer hover:opacity-55">Register</li>
          </ul>
        </div>
      </div>

      <div className="bg-accent text-primary font-semibold px-2">
        <span className="font-bold text-lg">©</span> 2024 Premium Cars. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
