import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PasswordInput from "../ui/PasswordInput";
import { Checkbox } from "../ui/checkbox";
import { IUser } from "@/interfaces/user";

const baseSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

const registerSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
  isAdmin: z.boolean(),
});

const extendedSchema = baseSchema.merge(registerSchema);

interface RegisterFormProps {
  submitForm: (user: IUser) => void;
  existingUser?: IUser;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ submitForm, existingUser }) => {
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const formSchemeToUse = existingUser ? baseSchema : extendedSchema;

  const form = useForm({
    resolver: zodResolver(formSchemeToUse),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      isAdmin: false,
    },
  });

  const { reset } = form;

  const onSubmit = (data: any) => {
    if (!existingUser) {
      const passwordsMatch = data.password == confirmPassword;

      if (!passwordsMatch) return setConfirmPasswordError(`Value does not match password!`);

      setConfirmPasswordError(null);
    }

    submitForm(data);
  };

  useEffect(() => {
    if (!existingUser) return;

    reset(existingUser);
  }, [existingUser]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md mt-5 w-full md:w-auto animate__animated animate__fadeIn"
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
        {!existingUser && (
          <>
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

              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    value={confirmPassword || ``}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
                <p className="text-primary">{confirmPasswordError}</p>
              </FormItem>
            </div>
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="w-full flex items-end gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormLabel className="text-primary font-bold">
                    Admin Account <span className="font-normal">(For project purposes)</span>
                  </FormLabel>
                  <FormMessage className="text-primary" />
                </FormItem>
              )}
            />
          </>
        )}

        {/* Submit Button */}
        <Button type="submit">Register</Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
