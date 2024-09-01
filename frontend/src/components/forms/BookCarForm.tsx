import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/DatePicker";
import CardPaymentModal from "../orders/CardPaymentModal";

const formSchema = z.object({
  pickupSpot: z.string().min(1, "Pickup spot is required"),
  dropoffSpot: z.string().min(1, "Dropoff spot is required"),
  paymentMethod: z.enum(["cash", "credit"]),
  dates: z.object({
    from: z.date({
      message: "Invalid 'from' date",
    }),
    to: z.date({
      message: "Invalid 'to' date",
    }),
  }),
});

interface BookCarFormProps {
  carPrice: number;
}

const BookCarForm: React.FC<BookCarFormProps> = ({ carPrice }) => {
  const [dayAmount, setDayAmount] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickupSpot: "spot1",
      dropoffSpot: "spot2",
      paymentMethod: "cash",
      dates: {
        from: "",
        to: "",
      },
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
    if (data.paymentMethod === `credit`) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full md:w-2/3 flex flex-col md:flex-row gap-5"
        >
          <div className="h-full flex md:flex-col gap-5 md:gap-5 justify-center md:w-1/3">
            {/* Pickup Spot */}
            <FormField
              control={form.control}
              name="pickupSpot"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Pickup Spot</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger className="border-border">
                        <SelectValue placeholder="Spot 1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spot1">Spot 1</SelectItem>
                        <SelectItem value="spot2">Spot 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropoff Spot */}
            <FormField
              control={form.control}
              name="dropoffSpot"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Dropoff Spot</FormLabel>
                  <FormControl>
                    <Select {...field}>
                      <SelectTrigger>
                        <SelectValue placeholder="Spot 1" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spot1">Spot 1</SelectItem>
                        <SelectItem value="spot2">Spot 2</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {/* Dates */}
            <FormField
              control={form.control}
              name="dates"
              render={({ field }) => (
                <FormItem className="pb-4">
                  <FormLabel>Dates</FormLabel>
                  <FormControl>
                    <DatePicker onChange={field.onChange} setDayAmount={setDayAmount} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex items-center justify-center gap-10"
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="credit" id="credit" />
                        <Label htmlFor="credit">Credit</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col items-center justify-around gap-2 md:w-1/3">
            <h2 className="font-bold text-2xl text-center">Final Price:</h2>
            <h3 className="font-bold text-primary text-2xl">{carPrice * dayAmount}$</h3>
            {/* Submit */}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <CardPaymentModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        price={carPrice * dayAmount}
      />
    </>
  );
};

export default BookCarForm;
