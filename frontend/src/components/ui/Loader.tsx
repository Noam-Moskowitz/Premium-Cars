import React from "react";

interface LoaderProps {
  size: `small` | `medium` | `large`;
}

const Loader: React.FC<LoaderProps> = ({ size }) => {
  const convertSizeToTailwindCss = (sizeParam: string) => {
    switch (sizeParam) {
      case `small`:
        return `h-12 w-12 border-4`;

      case `medium`:
        return `h-16 w-16 border-4`;

      case `large`:
        return `w-20 h-20 border-8`;
    }
  };

  const loaderSize = convertSizeToTailwindCss(size);

  return (
    <div className="size-full flex items-center justify-center animate-pulse">
      <div className={`${loaderSize} border-primary border-dashed rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;
