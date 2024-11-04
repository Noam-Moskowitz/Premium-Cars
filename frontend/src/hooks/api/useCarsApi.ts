import { deleteItem, fetchData, sendData, updateItem } from "@/API/api";
import { ICar } from "@/interfaces/car";
import React from "react";

const useCarsApi = () => {
  const CARS_ENDPOINT = `/cars`;

  const getAllCars = () => fetchData<ICar[]>(CARS_ENDPOINT);

  const getOneCar = (id: string) => fetchData<ICar>(`${CARS_ENDPOINT}/${id}`);

  const addCar = (carDetails: ICar) => sendData<ICar>(CARS_ENDPOINT, carDetails);

  const addManyCars = (carArray: ICar[]) => sendData<ICar>(CARS_ENDPOINT + `/many`, carArray);

  const updateCar = (id: string, carDetails: ICar) =>
    updateItem<ICar>(`${CARS_ENDPOINT}/${id}`, carDetails);

  const deleteCar = (id: string) => deleteItem<ICar>(CARS_ENDPOINT, id);

  const deleteManyCars = (deleteParams?: any) => deleteItem(CARS_ENDPOINT + `/many`, deleteParams);

  return {
    getAllCars,
    addCar,
    deleteCar,
    getOneCar,
    updateCar,
    addManyCars,
    deleteManyCars,
  };
};

export default useCarsApi;
