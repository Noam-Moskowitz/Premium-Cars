export interface IUserData {
  _id: string;
  first: string;
  last: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin?: boolean;
  __v?: string;
}
