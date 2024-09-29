export interface ICar {
  _id?: string;
  make: string;
  model: string;
  year: number;
  seatAmount: number;
  pricePerDay: number;
  gear: string;
  doors: number;
  image: string;
}

export interface ICarSpecs {
  seatAmount: number;
  gear: string;
  doors: number;
}
