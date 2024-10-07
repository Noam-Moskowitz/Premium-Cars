import { carColumns } from "@/components/tables/columns/CarColumns";
import { DataTable } from "@/components/tables/DataTable";
import Loader from "@/components/ui/Loader";
import { CAR_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/api/useCarsApi";
import useCheckToken from "@/hooks/useCheckToken";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CarsPage = () => {
  const { checkPermissions } = useCheckToken();
  const { getAllCars, deleteCar } = useCarsApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [CAR_QUERY_KEY],
    queryFn: getAllCars,
    staleTime: ONE_HOUR,
  });

  const removeCar = useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: () => {
      toast.success(`Car removed succesfully!`);
      queryClient.invalidateQueries({ queryKey: [CAR_QUERY_KEY] });
    },
    onError: (e: any) =>
      toast.error(`Oops, something went wrong!`, {
        description: e.response.data,
      }),
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" />;
  return (
    <div className="w-full h-[100vh] p-10">
      <DataTable
        columns={carColumns}
        data={data || []}
        actionButtonTitle="Add Car"
        handleViewData={({ _id }) => navigate(`/cars/update/${_id}`)}
        handleActionButton={() => navigate(`/cars/new`)}
        handleDeleteData={({ _id }) => removeCar.mutate(_id || ``)}
      />
    </div>
  );
};

export default CarsPage;
