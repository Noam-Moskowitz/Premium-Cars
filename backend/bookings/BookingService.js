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

  static async getOneBooking(bookingId) {
    try {
      const booking = await Booking.findById(bookingId);

      return booking;
    } catch (error) {
      throw error;
    }
  }

  static async getBookingsByUser(userId) {
    try {
      const bookings = await Booking.find({ userId });

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async getBookingsByStatus(status, userId) {
    try {
      const bookings = await Booking.find({ status, userId });

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async getBookingsByCar(carId) {
    try {
      const bookings = await Booking.find({ carId });

      return bookings;
    } catch (error) {
      throw error;
    }
  }

  static async addBooking(bookingInfo) {
    try {
      const newBooking = await Booking.create(bookingInfo);

      return newBooking;
    } catch (error) {
      throw error;
    }
  }

  static async updateBooking(bookingId, newBookingInfo) {
    try {
      const newBooking = await Booking.findByIdAndUpdate(bookingId, newBookingInfo, { new: true });

      return newBooking;
    } catch (error) {
      throw error;
    }
  }

  static async changeBookingStatus(bookingId) {
    try {
      const booking = await Booking.findByIdAndUpdate(
        bookingId,
        {
          $set: {
            status: {
              $cond: { if: { $eq: ["$status", "canceled"] }, then: "active", else: "canceled" },
            },
          },
        },
        { new: true }
      );

      return booking;
    } catch (error) {
      throw error;
    }
  }
  static async deleteBooking(bookingId) {
    try {
      const removedBooking = await Booking.findByIdAndDelete(bookingId);

      return removedBooking;
    } catch (error) {
      throw error;
    }
  }
}
