export interface IAddress {
  _id?: string;
  street: string;
  houseNumber: number;
  city: string;
  country: string;
  state?: string;
  zip?: string;
}

export interface IBranch {
  _id?: string;
  name: string;
  address: IAddress;
  phone: string;
  favorites: string[];
}

export interface IBranchNames {
  _id?: string;
  name: string;
  favorites: string[];
}
