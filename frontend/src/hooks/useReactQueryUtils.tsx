import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useReactQueryUtils = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const successFunc = (message: string, queryKeyArray: string[], navPath?: string) => {
    toast.success(message);
    queryKeyArray.forEach((key) => {
      queryClient.invalidateQueries({ queryKey: [key] });
    });

    if (!navPath) return;

    navigate(navPath);
  };

  const errorFunc = (err: any) => {
    toast.error(`Oops, something went wrong!`, {
      description: err.response.data.message.message || err.response.data.message,
    });
  };

  return { successFunc, errorFunc };
};

export default useReactQueryUtils;
