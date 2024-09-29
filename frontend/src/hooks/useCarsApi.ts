import { deleteItem, fetchData, sendData } from "@/API/api";
import { ICar } from "@/interfaces/car";
import React from "react";

const useCarsApi = () => {
  const CARS_ENDPOINT = `/cars`;

  const getAllCars = () => fetchData<ICar[]>(CARS_ENDPOINT);

  const getOneCar = (id: string) => fetchData<ICar[]>(`${CARS_ENDPOINT}/${id}`);

  const addCar = (carDetails: ICar) => sendData<ICar>(CARS_ENDPOINT, carDetails);

  const updateCar = (id: string, carDetails: ICar) =>
    sendData<ICar>(`${CARS_ENDPOINT}/${id}`, carDetails);

  const deleteCar = (id: string) => deleteItem<ICar>(CARS_ENDPOINT, id);

  return {
    getAllCars,
    addCar,
    deleteCar,
    getOneCar,
    updateCar,
  };
};

export default useCarsApi;
