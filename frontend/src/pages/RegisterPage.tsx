import RegisterForm from "@/components/forms/RegisterForm";
import ErrorComponent from "@/components/ui/ErrorComponent";
import Loader from "@/components/ui/Loader";
import { ONE_HOUR, SINGLE_USER_KEY, USER_QUERY_KEY } from "@/consts/reactQuery";
import useUserApi from "@/hooks/api/useUserApi";
import useReactQueryUtils from "@/hooks/useReactQueryUtils";
import { IUser } from "@/interfaces/user";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const RegisterPage = () => {
  const { id } = useParams();
  const { addUser, updateUser, getOneUser } = useUserApi();
  const { errorFunc, successFunc } = useReactQueryUtils();

  const existingUserResponse = useQuery({
    queryFn: () => getOneUser(id || ``),
    queryKey: [SINGLE_USER_KEY + id],
    enabled: !!id,
    staleTime: ONE_HOUR,
  });

  const createNewUser = useMutation({
    mutationFn: (user: IUser) => addUser(user),
    onSuccess: () => successFunc(`User created succesfully!`, [USER_QUERY_KEY], `/user/login`),
    onError: errorFunc,
  });

  const updateExistingUser = useMutation({
    mutationFn: ({ user, userId }: { user: IUser; userId: string }) => updateUser(user, userId),
    onSuccess: () => successFunc(`User updated succesfully!`, [USER_QUERY_KEY]),
    onError: errorFunc,
  });

  const handleSubmit = (user: IUser) => {
    if (id) {
      updateExistingUser.mutate({ user, userId: id });
      return;
    }

    createNewUser.mutate(user);
  };

  if (existingUserResponse.isError)
    return <ErrorComponent errorMessage={existingUserResponse.error.response.data.message} />;

  if (existingUserResponse.isLoading && id) return <Loader size="large" variant="screen" />;

  return (
    <div className="size-full min-h-[85vh] flex flex-col items-center justify-center">
      <RegisterForm
        submitForm={(user) => handleSubmit(user)}
        existingUser={existingUserResponse.data}
      />
    </div>
  );
};

export default RegisterPage;
