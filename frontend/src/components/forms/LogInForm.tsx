import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "../ui/PasswordInput";
import { useNavigate } from "react-router-dom";
import useUserApi from "@/hooks/api/useUserApi";
import { toast } from "sonner";
import { saveUser } from "@/store/userSlice";
import { useDispatch } from "react-redux";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

interface LogInFormProps {
  selectedEmail: string | null;
  handleClick?: () => void;
}

const LogInForm: React.FC<LogInFormProps> = ({ selectedEmail, handleClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logIn } = useUserApi();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: selectedEmail || "",
      password: "",
    },
  });

  const addToSavedUserList = (email: string) => {
    const usersList = localStorage.getItem("users");

    if (!usersList) return localStorage.setItem("users", JSON.stringify([email]));
    if (usersList.includes(email)) return;

    const updatedUsers = [...JSON.parse(usersList), email];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const onSubmit = (data: any) => {
    logIn(data)
      .then((res) => {
        toast.success(`Log in succesful`);
        addToSavedUserList(data.email);
        dispatch(saveUser(res));
        navigate(`/`);
      })
      .catch((err) => toast.error(`Log in failed`, { description: err.response.data.message }));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" flex flex-col gap-5 ">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) =>
            selectedEmail ? (
              <div className="flex flex-col items-center pt-5">
                <h3 className="text-primary text-left w-full">signing into:</h3>
                <p className="text-center font-bold bg-background w-full rounded py-2 cursor-not-allowed">
                  {selectedEmail}
                </p>
                <Button variant="link" className="px-0 mt-4 m-auto" onClick={handleClick}>
                  Use a different account
                </Button>
              </div>
            ) : (
              <FormItem>
                <FormLabel className="text-primary font-bold">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="example@email.com"
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )
          }
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary font-bold">Password</FormLabel>
              <FormControl>
                <PasswordInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Login</Button>
      </form>
      {!selectedEmail && (
        <Button variant="link" className="px-0 mt-4" onClick={handleClick}>
          Use a saved account
        </Button>
      )}
    </Form>
  );
};

export default LogInForm;
