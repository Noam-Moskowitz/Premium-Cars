import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import useCarsApi from "@/hooks/useCarsApi";
import { toast } from "sonner";

const formSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  year: z.coerce
    .number()
    .min(1886, "Year must be valid")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  seatAmount: z.coerce.number().min(1, "Must have at least 1 seat"),
  pricePerDay: z.coerce.number().min(0, "Price must be a positive number"),
  gear: z.enum(["Automatic", "Manual"], { required_error: "Please select a gear type" }),
  doors: z.coerce.number().min(1, "Must have at least 1 door"),
  image: z.string().url("Please provide a valid URL for the image"),
});

interface CarFormProps {
  handleSubmit: (params?: any) => void;
  id?: string;
}

const CarForm: React.FC<CarFormProps> = ({ handleSubmit, id }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      make: "",
      model: "",
      year: undefined,
      seatAmount: undefined,
      pricePerDay: undefined,
      gear: "Automatic",
      doors: undefined,
      image: "",
    },
  });

  const onSubmit = (data: any) => {
    const payload = id ? { id, data } : data;
    handleSubmit(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md mt-5 w-2/3 md:w-auto"
      >
        <h1 className="text-primary text-center font-bold text-3xl uppercase">Car Information</h1>

        {/* Make Field */}
        <FormField
          control={form.control}
          name="make"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Make</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="Please enter the car manufacturer.."
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        {/* Model Field */}
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Model</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="Please enter the car model.."
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Year Field */}
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Year</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="Model Year.."
                    min={0}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Seat Amount Field */}
          <FormField
            control={form.control}
            name="seatAmount"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Seat Amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="5"
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Price Per Day Field */}
          <FormField
            control={form.control}
            name="pricePerDay"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Price Per Day</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="50$"
                    min={0}
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* Gear Field */}
          <FormField
            control={form.control}
            name="gear"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Gear</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="border-0 p-2 w-full">
                      <SelectValue placeholder="Automatic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Automatic">Automatic</SelectItem>
                      <SelectItem value="Manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        {/* Doors Field */}
        <FormField
          control={form.control}
          name="doors"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Doors</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="4"
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Image</FormLabel>
              <FormControl>
                <Input
                  type="string"
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="Please enter a image url!"
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CarForm;
