import CarForm from "@/components/forms/CarForm";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import { CAR_QUERY_KEY, ONE_HOUR, SINGLE_CAR_KEY } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/api/useCarsApi";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { ICar } from "@/interfaces/car";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const CarFormPage = () => {
  const { addCar, updateCar, getOneCar } = useCarsApi();
  const { errorFunc, successFunc } = useReactQueryUtils();
  const { id } = useParams();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [SINGLE_CAR_KEY + id],
    queryFn: () => getOneCar(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const addNewCar = useMutation({
    mutationFn: addCar,
    onSuccess: () =>
      successFunc(`Car created succesfully!`, [CAR_QUERY_KEY, SINGLE_CAR_KEY + id], `/cars`),
    onError: errorFunc,
  });

  const editCar = useMutation({
    mutationFn: ({ id, carDetails }: { id: string; carDetails: ICar }) => updateCar(id, carDetails),
    onSuccess: () =>
      successFunc(`Car updated succesfully!`, [CAR_QUERY_KEY, SINGLE_CAR_KEY + id], `/cars`),
    onError: errorFunc,
  });

  const handleSubmit = (carDetails: ICar) => {
    if (id) {
      editCar.mutate({ id, carDetails });
    } else {
      addNewCar.mutate(carDetails);
    }
  };

  if (isLoading && id) return <Loader size="large" variant="screen" />;
  if (isError) return <ErrorComponent errorMessage={error.message} />;

  return (
    <div className="size-full flex items-center justify-center p-10">
      <CarForm existingData={data} handleSubmit={handleSubmit} />
    </div>
  );
};

export default CarFormPage;
