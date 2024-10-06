import React, { useEffect } from "react";
import CarDetails from "@/components/cars/CarDetails";
import BookCarForm from "@/components/forms/BookCarForm";
import "animate.css";
import useCheckToken from "@/hooks/useCheckToken";
import { useParams } from "react-router-dom";
import useCarsApi from "@/hooks/useCarsApi";
import { useQuery } from "@tanstack/react-query";
import { ONE_HOUR } from "@/consts/reactQuery";
import Loader from "@/components/ui/Loader";

const RentCarPage = () => {
  const { checkPermissions } = useCheckToken();
  const { id } = useParams();
  const { getOneCar } = useCarsApi();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: [`car-${id}`],
    queryFn: () => getOneCar(id || ``),
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" />;

  return (
    <div className="w-full h-[90vh]  flex flex-col item-center justify-between bg-accent">
      <div className="md:h-[60vh] pb-10 flex items-center animate__animated animate__fadeIn">
        <img className=" md:w-[500px] lg:w-[700px] m-auto" src={data?.image} alt="Car Image" />
      </div>
      <CarDetails car={data} />
      <div className="w-full md:h-[30vh] bg-background md:rounded-t-lg animate__animated animate__fadeInUp  flex justify-center items-center py-5  md:border-2 ">
        <BookCarForm carPrice={data?.pricePerDay || 0} />
      </div>
    </div>
  );
};

export default RentCarPage;
