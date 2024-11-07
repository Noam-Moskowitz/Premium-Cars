import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BOOKINGS_BY_CAR_KEY, ONE_HOUR, SINGLE_BOOKING_KEY } from "@/consts/reactQuery";
import { useParams } from "react-router-dom";
import useBookingApi from "@/hooks/api/useBookingApi";
import { useQuery } from "@tanstack/react-query";

interface DatePickerProps {
  onChange: (date: DateRange) => void;
  existingValue?: DateRange;
  setDayAmount: (days: number) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  setDayAmount,
  existingValue,
}) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [bookedDates, setBookedDates] = useState<DateRange[]>([]);
  const { id, bookingId } = useParams();
  const { getBookingsByCar, getOneBooking } = useBookingApi();

  const bookingsPerCar = useQuery({
    queryFn: () => getBookingsByCar(id || ``),
    queryKey: [BOOKINGS_BY_CAR_KEY + id],
    staleTime: ONE_HOUR,
    enabled: !!id,
  });

  const existingBookingResponse = useQuery({
    queryFn: () => getOneBooking(bookingId || ``),
    queryKey: [SINGLE_BOOKING_KEY + bookingId],
    staleTime: ONE_HOUR,
    enabled: !!bookingId,
  });

  const handleSelect = (range?: DateRange) => {
    if (!range) return;

    if (range.to) {
      range.to = new Date(range.to);
    }
    if (range.from) {
      range.from = new Date(range.from);
    }

    setDate(range);

    const { from, to } = range;

    if (!from || !to) return;

    const timeDifference = to.getTime() - from.getTime();
    const dayAmount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    setDayAmount(dayAmount);
    onChange(range);
  };

  useEffect(() => {
    if (!bookingsPerCar.data) return;

    const carsBookedDates = bookingsPerCar.data
      .filter((booking) => {
        const fromDate = new Date(booking.dates.from || ``);
        const toDate = new Date(booking.dates.to || ``);

        return (
          toDate.getTime() > Date.now() &&
          fromDate.getTime() !==
            new Date(existingBookingResponse.data?.dates?.from || ``).getTime() &&
          toDate.getTime() !== new Date(existingBookingResponse.data?.dates?.to || ``).getTime() &&
          booking.status === "active"
        );
      })
      .map((booking) => booking.dates);
    setBookedDates(carsBookedDates);
  }, [bookingsPerCar.data, existingBookingResponse.data]);

  useEffect(() => {
    if (!existingValue) return;

    setDate(existingValue);
  }, [existingValue]);

  console.log(date);

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={[{ before: new Date() }, ...bookedDates]}
            modifiers={{ occupiedDates: bookedDates }}
            modifiersClassNames={{
              occupiedDates: ` line-through bg-secondary`,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
