import { carColumns } from "@/components/tables/columns/CarColumns";
import { DataTable } from "@/components/tables/DataTable";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import { CAR_QUERY_KEY, ONE_HOUR } from "@/consts/reactQuery";
import useCarsApi from "@/hooks/api/useCarsApi";
import useCheckToken from "@/hooks/useCheckToken";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CarsPage = () => {
  const { checkPermissions } = useCheckToken();
  const { getAllCars, deleteCar } = useCarsApi();
  const { errorFunc, successFunc } = useReactQueryUtils();
  const navigate = useNavigate();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: [CAR_QUERY_KEY],
    queryFn: getAllCars,
    staleTime: ONE_HOUR,
  });

  const removeCar = useMutation({
    mutationFn: (id: string) => deleteCar(id),
    onSuccess: () => successFunc(`Car removed succesfully!`, [CAR_QUERY_KEY]),
    onError: errorFunc,
  });

  useEffect(() => {
    checkPermissions();
  }, []);

  if (isLoading) return <Loader size="large" />;
  if (isError) return <ErrorComponent errorMessage={error} />;

  return (
    <div className="w-full min-h-[100vh] p-10">
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
