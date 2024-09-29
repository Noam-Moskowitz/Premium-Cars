import CarDetails from "@/components/cars/CarDetails";
import CarForm from "@/components/forms/CarForm";
import Loader from "@/components/ui/Loader";
import { CAR_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/useCarsApi";
import { ICar } from "@/interfaces/car";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CarFormPage = () => {
  const { addCar, updateCar, getOneCar } = useCarsApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`car-${id}`],
    queryFn: () => getOneCar(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const successFunc = () => {
    toast.success(`Car saved succesfully!`);
    queryClient.invalidateQueries({ queryKey: [CAR_QUERY_KEY] });
    queryClient.invalidateQueries({ queryKey: [[`car-${id}`]] });
    navigate(`/cars`);
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

  const handleSubmit = (carDetails: ICar) => {
    if (id) {
      editCar.mutate({ id, carDetails });
    } else {
      addNewCar.mutate(carDetails);
    }
  };

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="size-full flex items-center justify-center p-10">
      <CarForm existingData={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CarFormPage;
