import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "../ui/PasswordInput";
import useUserApi from "@/hooks/useUserApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const formSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const RegisterForm = () => {
  const navigate = useNavigate();

  const { addUser } = useUserApi();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    delete data.confirmPassword;

    addUser(data)
      .then(() => {
        toast.success(`Registration Succesful!`);
        navigate(`/user/login`);
      })
      .catch((err) => {
        console.log(`err`, err);

        toast.error(`Registration failed!`, {
          description: err.response.data.message.message || err.response.data.message,
        });
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md mt-5 w-2/3 md:w-auto animate__animated animate__fadeIn"
      >
        <h1 className="text-primary text-center font-bold text-3xl uppercase">Register</h1>
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* First Name Field */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">First Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="John"
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Last Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="border-0 p-2 w-full" placeholder="Doe" />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
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

          {/* Phone Field */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Phone</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="555-555-5555"
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Password</FormLabel>
                <FormControl>
                  <PasswordInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
