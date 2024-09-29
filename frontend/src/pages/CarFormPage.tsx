import CarDetails from "@/components/cars/CarDetails";
import CarForm from "@/components/forms/CarForm";
import { CAR_QUERY_KEY } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/useCarsApi";
import { ICar } from "@/interfaces/car";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

const CarFormPage = () => {
  const { addCar, updateCar } = useCarsApi();
  const queryClient = useQueryClient();

  const successFunc = () => {
    toast.success(`Car created succesfully!`);
    queryClient.invalidateQueries({ queryKey: [CAR_QUERY_KEY] });
  };

  const errorFunc = (err: any) => {
    toast.error(`Oops, something went wrong!`, {
      description: err.response.data.message.message || err.response.data.message,
    });
  };

  const addNewCar = useMutation({
    mutationFn: addCar,
    onSuccess: successFunc,
    onError: errorFunc,
  });

  const editCar = useMutation({
    mutationFn: ({ id, carDetails }: { id: string; carDetails: ICar }) => updateCar(id, carDetails),
    onSuccess: successFunc,
    onError: errorFunc,
  });

  return (
    <div className="size-full flex items-center justify-center p-10">
      <CarForm handleSubmit={addNewCar.mutate} />
    </div>
  );
};

export default CarFormPage;
