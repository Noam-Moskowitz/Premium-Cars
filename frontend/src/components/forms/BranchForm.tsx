import React, { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

// Define validation schema based on IBranch interface
const formSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.object({
    street: z.string().min(1, "Street is required"),
    houseNumber: z.coerce.number().min(1, "House number must be positive"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().optional(),
    zip: z.string().optional(),
  }),
});

interface BranchFormProps {
  handleSubmit: (params?: any) => void;
  existingData?: any;
}

const BranchForm: React.FC<BranchFormProps> = ({ handleSubmit, existingData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: {
        street: "",
        houseNumber: undefined,
        city: "",
        country: "",
        state: "",
        zip: "",
      },
    },
  });

  useEffect(() => {
    if (existingData) {
      form.reset(existingData);
    }
  }, [existingData]);

  const onSubmit = (data: any) => {
    handleSubmit(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md mt-5 w-2/3 md:w-auto"
      >
        <h1 className="text-primary text-center font-bold text-3xl uppercase">
          Branch Information
        </h1>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Branch Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="Enter branch name.."
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
                  placeholder="Enter phone number.."
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <h2 className="text-primary font-bold text-2xl">Address Information</h2>
        {/* Address Fields */}
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Street</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter street.."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.houseNumber"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">House Number</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter house number.."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <FormField
            control={form.control}
            name="address.city"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">City</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter city.."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Country</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter country.."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <FormField
            control={form.control}
            name="address.state"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">State</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter state (optional).."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.zip"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">ZIP Code</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Enter zip code (optional).."
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default BranchForm;
