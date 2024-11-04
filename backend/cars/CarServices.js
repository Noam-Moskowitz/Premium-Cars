import { Car } from "./CarModel.js";

export class CarServices {
  static async getAllCars() {
    try {
      const allCars = await Car.find();

      return allCars;
    } catch (error) {
      throw error;
    }
  }

  static async getOneCar(carId) {
    try {
      const car = await Car.findById(carId);

      return car;
    } catch (error) {
      throw error;
    }
  }

  static async addCar(carInfo) {
    try {
      const newCar = await Car.create(carInfo);

      return newCar;
    } catch (error) {
      throw error;
    }
  }

  static async addManyCars(carsArray) {
    try {
      const createdCars = await Car.insertMany(carsArray);

      return createdCars;
    } catch (error) {
      throw error;
    }
  }

  static async updateCar(carId, carInfo) {
    try {
      const updatedCar = Car.findByIdAndUpdate(carId, carInfo, { new: true });

      return updatedCar;
    } catch (error) {
      throw error;
    }
  }

  static async deleteCar(carId) {
    try {
      const deletedCar = await Car.findByIdAndDelete(carId);

      return deletedCar;
    } catch (error) {
      throw error;
    }
  }

  static async deleteManyCars(params = {}) {
    try {
      const removedCars = await Car.deleteMany(params);

      return removedCars;
    } catch (error) {
      throw error;
    }
  }
}
