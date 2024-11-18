import React from "react";
import { FaCcMastercard, FaCcVisa } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { sitemapItems } from "@/consts/footer";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary  shadow-lg border-t-8 text-background ">
      <div className="flex flex-col md:flex-row-reverse justify-around p-3">
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
            <Button
              variant="ghost"
              className="underline"
              onClick={() => navigate(`/user/register`)}
            >
              Sign Up
            </Button>
          </div>
        </div>

        <div>
          <h6 className="font-bold">Sitemap:</h6>
          <ul className="underline list-disc list-inside grid grid-cols-2">
            {sitemapItems.map(({ link, title }, i) => (
              <li
                key={i}
                className="cursor-pointer hover:opacity-55"
                onClick={() => navigate(link)}
              >
                {title}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-accent text-primary font-semibold px-2 text-xs">
        <span className="font-bold text-md">©</span> 2024 Premium Cars. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
