import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { DatePicker } from "../ui/DatePicker";
import CardPaymentModal from "../orders/CardPaymentModal";
import SelectBranch from "../ui/SelectBranch";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IBooking } from "@/interfaces/booking";

const formSchema = z.object({
  pickUpSpot: z.string().min(1, "Pickup spot is required"),
  dropOffSpot: z.string().min(1, "Dropoff spot is required"),
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
  existingBooking?: IBooking;
  submitForm: (booking: IBooking) => void;
}

const BookCarForm: React.FC<BookCarFormProps> = ({ carPrice, existingBooking, submitForm }) => {
  const { id } = useParams();
  const userId = useSelector((store: any) => store.user._id);
  const [price, setPrice] = useState(existingBooking?.price || carPrice);
  const [openModal, setOpenModal] = useState(false);
  const [paid, setPaid] = useState(existingBooking?.paid || false);
  const [booking, setBooking] = useState<IBooking | null>(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pickUpSpot: "",
      dropOffSpot: "",
      paymentMethod: "cash",
      dates: {
        from: "",
        to: "",
      },
    },
  });

  const { reset } = form;

  const onSubmit = (data: any) => {
    const bookingObj = {
      ...data,
      carId: id,
      userId,
      paid,
      price: price,
    };

    delete bookingObj.paymentMethod;

    if (data.paymentMethod === `credit` && !paid) {
      setOpenModal(true);
      setBooking(bookingObj);
    } else {
      submitForm(bookingObj);
    }
  };

  const handleSuccesuflPayment = () => {
    setPaid(true);

    const bookingToSubmit = { ...booking, paid: true };

    submitForm(bookingToSubmit);
  };

  useEffect(() => {
    if (!existingBooking) return;

    const { from, to } = existingBooking.dates ?? {};
    existingBooking.dates.from = new Date(from);
    existingBooking.dates.to = new Date(to);

    reset(existingBooking);
  }, [existingBooking]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full md:w-2/3 flex flex-col md:flex-row gap-5 px-3"
        >
          <div className="h-full flex flex-wrap  md:flex-col gap-5 md:gap-5 justify-center md:w-1/3">
            {/* Pickup Spot */}
            <FormField
              control={form.control}
              name="pickUpSpot"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Pickup Spot</FormLabel>
                  <FormControl>
                    <SelectBranch handleChange={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dropoff Spot */}
            <FormField
              control={form.control}
              name="dropOffSpot"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Dropoff Spot</FormLabel>
                  <FormControl>
                    <SelectBranch handleChange={field.onChange} value={field.value} />
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
                    <DatePicker
                      existingValue={field.value}
                      onChange={field.onChange}
                      setDayAmount={(days) => setPrice(days * carPrice)}
                    />
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
            <h3 className="font-bold text-primary text-2xl">
              {paid ? <span className="uppercase text-green-500">Paid</span> : price + `$`}
            </h3>
            {/* Submit */}
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
      <CardPaymentModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
        price={existingBooking?.price || price}
        hasPaid={handleSuccesuflPayment}
      />
    </>
  );
};

export default BookCarForm;
