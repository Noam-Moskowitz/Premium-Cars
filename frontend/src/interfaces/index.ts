import React from "react";

export interface IFilter {
  gearType: "Manual" | "Automatic" | null;
  doors: string | null;
  priceRange: number[];
  searchParam: string | null;
}

export interface IFilterItem {
  name: string;
  component: React.ReactNode;
  selectedFilter: React.ComponentState;
}
