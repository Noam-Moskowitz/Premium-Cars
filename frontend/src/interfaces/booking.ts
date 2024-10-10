import { DateRange } from "react-day-picker";

export interface IBooking {
  carId: string; // Reference to the Car document as a string
  userId: string; // Reference to the User document as a string
  pickUpSpot: string; // Reference to the Branch document for pickup as a string
  dropOffSpot: string; // Reference to the Branch document for drop-off as a string
  dates: DateRange; // Date range for the booking
  paid: boolean; // Indicates if the booking is paid
  price?: number;
  status?: "active" | "canceled" | "passed"; // Status of the booking
  createdAt?: string; // Timestamp for when the booking was created as an ISO string
  updatedAt?: string; // Timestamp for when the booking was last updated as an ISO string
  _id?: string;
}
