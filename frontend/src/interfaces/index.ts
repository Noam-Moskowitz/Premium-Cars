export interface IFilter {
  gearType: "Manual" | "Automatic" | null;
  doors: string | null;
  priceRange: number[];
  searchParam: string | null;
}
