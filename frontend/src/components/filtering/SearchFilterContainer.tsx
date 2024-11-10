import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "../ui/input";
import { FaSearch } from "react-icons/fa";
import { Button } from "../ui/button";
import { IFilterItem } from "@/interfaces";

interface SearchFilterContainerProps {
  onClear: () => void;
  filtersArray: IFilterItem[];
  handleSearch: (value: string | null) => void;
  showClearButton?: boolean;
  searchValue?: string | null;
}

const SearchFilterContainer: React.FC<SearchFilterContainerProps> = ({
  filtersArray,
  onClear,
  handleSearch,
  showClearButton = false,
  searchValue,
}) => {
  const handleInputChange = (value: string) => {
    if (!value) return handleSearch(null);

    handleSearch(value);
  };

  return (
    <div className=" flex gap-1 flex-wrap justify-center items-stretch border-2 border-primary rounded w-[80vw] md:w-fit shadow  mx-auto p-2">
      <div className="relative">
        <Input
          className="bg-accent"
          placeholder="search"
          value={searchValue || ``}
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <FaSearch className="absolute top-3 right-2" />
      </div>
      <div className="flex px-2  justify-center flex-wrap">
        {filtersArray.map(({ name, component, selectedFilter }, i) => (
          <DropdownMenu key={i}>
            <DropdownMenuTrigger className="hover:bg-accent  px-2 rounded">
              <div className="flex flex-col">
                {name}
                <p className="font-thin text-primary">{selectedFilter}</p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>{component}</DropdownMenuContent>
          </DropdownMenu>
        ))}
      </div>
      {showClearButton && (
        <Button variant="link" onClick={onClear}>
          Clear
        </Button>
      )}
    </div>
  );
};

export default SearchFilterContainer;
