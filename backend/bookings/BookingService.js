import { Booking } from "./BookingModel.js";

export class BookingServices {
  static async getAllBookings() {
    try {
      const allBookings = await Booking.find();

      return allBookings;
    } catch (error) {
      throw error;
    }
  }

  static async getAllBookings() {}
  static async getAllBookings() {}
  static async getAllBookings() {}
  static async getAllBookings() {}
}
