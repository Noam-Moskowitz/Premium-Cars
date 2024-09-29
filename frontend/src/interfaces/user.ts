export interface IUserData {
  _id: string;
  first: string;
  last: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  isAdmin?: boolean;
}
