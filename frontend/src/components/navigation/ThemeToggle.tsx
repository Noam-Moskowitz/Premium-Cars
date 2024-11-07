import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/theme/ThemeProvider";
import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div
      className="relative cursor-pointer"
      onClick={() => setTheme(theme == `light` ? `dark` : `light`)}
    >
      <Switch checked={theme == `dark` ? true : false} />
      {theme == `dark` ? (
        <FiSun size={20} className="absolute left-0.5 top-1/2 transform -translate-y-1/2 pb-1" />
      ) : (
        <FiMoon size={20} className="absolute right-1 top-1/2 transform -translate-y-1/2 pb-1" />
      )}
    </div>
  );
};

export default ThemeToggle;
