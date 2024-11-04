import { CarServices } from "./CarServices.js";

export class CarController {
  static async getAllCars(req, res) {
    try {
      const allCars = await CarServices.getAllCars();

      res.send(allCars);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async getOneCar(req, res) {
    const { id } = req.params;

    try {
      const car = await CarServices.getOneCar(id);

      if (!car) return res.status(404).send({ message: `Car not found!` });

      res.send(car);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async addCar(req, res) {
    const carDetails = req.body;

    try {
      const newCar = await CarServices.addCar(carDetails);

      res.send(newCar);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async addManyCars(req, res) {
    const carArray = req.body;

    try {
      const newCars = await CarServices.addManyCars(carArray);

      res.send(newCars);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async updateCar(req, res) {
    const { id } = req.params;
    const newCarDetails = req.body;
    try {
      const updatedCar = await CarServices.updateCar(id, newCarDetails);

      if (!updatedCar) return res.status(404).send({ message: `Car not found!` });

      res.send(updatedCar);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteCar(req, res) {
    const { id } = req.params;
    try {
      const removedCar = await CarServices.deleteCar(id);

      if (!removedCar) return res.status(404).send({ message: `Car not found!` });

      res.send(removedCar);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  static async deleteManyCars(req, res) {
    const { deleteParams } = req.params;
    try {
      const removedCars = await CarServices.deleteManyCars(deleteParams);

      res.send(removedCars);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}
