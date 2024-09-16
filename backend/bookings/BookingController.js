import { BookingServices } from "./BookingService.js";

export class BookingController {
  static async getAllBookings(req, res) {
    try {
      const allBookings = await BookingServices.getAllBookings();

      res.send(allBookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getOneBooking(req, res) {
    const { id } = req.params;

    try {
      const booking = await BookingServices.getOneBooking(id);

      if (!booking) return res.status(404).send({ message: `Booking not found!` });

      res.send(booking);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getBookingsByUser(req, res) {
    const { userId } = req.params;

    try {
      const bookings = await BookingServices.getBookingsByUser(userId);

      res.send(bookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getBookingsByStatus(req, res) {
    const { status } = req.params;

    try {
      const bookings = await BookingServices.getBookingsByStatus(status);

      res.send(bookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  static async getBookingsByCar(req, res) {
    const { carId } = req.params;

    try {
      const bookings = await BookingServices.getBookingsByCar(carId);

      res.send(bookings);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async addBooking(req, res) {
    const bookingInfo = req.body;

    try {
      const newBooking = await BookingServices.addBooking(bookingInfo);

      res.send(newBooking);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async updateBooking(req, res) {
    const { id } = req.params;
    const newBookingInfo = req.body;

    try {
      const updatedBooking = await BookingServices.updateBooking(id, newBookingInfo);

      if (!updatedBooking) return res.status(404).send({ message: `Booking not found!` });

      res.send(updatedBooking);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async changeBookingStatus(req, res) {
    const { id } = req.params;

    try {
      const booking = await BookingServices.changeBookingStatus(id);

      if (!booking) return res.status(404).send({ message: `Booking not found!` });

      res.send(booking);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteBooking(req, res) {
    const { id } = req.params;

    try {
      const removedBooking = await BookingServices.deleteBooking(id);

      if (!removedBooking) return res.status(404).send({ message: `Booking not found!` });

      res.send(removedBooking);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
