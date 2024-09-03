import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "../ui/PasswordInput";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const LogInForm = () => {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md w-96 mt-5 animate__animated animate__fadeIn"
      >
        <h1 className="text-primary text-center font-bold text-3xl uppercase">log in</h1>
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
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
          )}
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
        <div className="flex justify-between text-primary underline">
          <p className="cursor-pointer">Forgot Password</p>
          <p className="cursor-pointer" onClick={() => navigate(`/user/register`)}>
            Register
          </p>
        </div>
      </form>
    </Form>
  );
};

export default LogInForm;
