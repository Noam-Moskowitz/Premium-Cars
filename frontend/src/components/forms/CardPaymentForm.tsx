import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa6";

const formSchema = z.object({
  cardName: z.string().min(1, "Cardholder name is required"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be 16 digits"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format")
    .refine(
      (date) => {
        const [month, year] = date.split("/").map(Number);

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear() % 100;

        return year > currentYear || (year === currentYear && month >= currentMonth);
      },
      {
        message: "Expiry date cannot be before the current month",
      }
    ),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
});

interface CardPaymentFormProps {
  amountToPay: number;
  paid: () => void;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({ amountToPay, paid }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    paid();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-accent p-10 rounded-md flex flex-col gap-5 shadow-md mt-5 md:w-2/3 md:w-auto"
      >
        <h1 className="text-center font-bold text-primary text-2xl">Fee: {amountToPay}$</h1>

        {/* Cardholder Name Field */}
        <FormField
          control={form.control}
          name="cardName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Cardholder Name</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  className="border-0 p-2 w-full"
                  placeholder="John Doe"
                />
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        {/* Card Number Field */}
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="text-primary font-bold">Card Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="1234 5678 9123 4567"
                  />
                  <div className="flex gap-1 absolute right-3 top-1/2 transform -translate-y-1/2">
                    <SiVisa />
                    <FaCcMastercard />
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-primary" />
            </FormItem>
          )}
        />

        <div className="flex flex-col md:flex-row gap-5 justify-between">
          {/* Expiry Date Field */}
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">Expiry Date</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    className="border-0 p-2 w-full"
                    placeholder="MM/YY"
                  />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />

          {/* CVV Field */}
          <FormField
            control={form.control}
            name="cvv"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-primary font-bold">CVV</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="border-0 p-2 w-full" placeholder="123" />
                </FormControl>
                <FormMessage className="text-primary" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit">Pay Now</Button>
      </form>
    </Form>
  );
};

export default CardPaymentForm;
