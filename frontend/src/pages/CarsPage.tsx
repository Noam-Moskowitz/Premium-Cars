import { carColumns } from "@/components/tables/columns/CarColumns";
import { DataTable } from "@/components/tables/DataTable";
import Loader from "@/components/ui/Loader";
import { CAR_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/useCarsApi";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const CarsPage = () => {
  const { getAllCars } = useCarsApi();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [CAR_QUERY_KEY],
    queryFn: getAllCars,
    staleTime: ONE_HOUR,
  });

  if (isLoading) return <Loader size="large" />;
  return (
    <div>
      <DataTable columns={carColumns} data={data || []} />
    </div>
  );
};

export default CarsPage;
