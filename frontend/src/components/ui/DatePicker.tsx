import React, { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerProps {
  onChange: (date: DateRange) => void;
  existingValue?: DateRange;
  setDayAmount: (days: number) => void;
  bookedDates?: DateRange[];
}

export const DatePicker: React.FC<DatePickerProps> = ({
  onChange,
  setDayAmount,
  existingValue,
  bookedDates,
}) => {
  const [date, setDate] = useState<DateRange | undefined>(existingValue);

  const handleSelect = (range?: DateRange) => {
    if (
      !range ||
      range.to?.getTime() < new Date().getTime() ||
      range.from?.getTime() < new Date().getTime()
    )
      return;

    setDate(range);

    const { from, to } = range;

    const timeDifference = to.getTime() - from.getTime();
    const dayAmount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    setDayAmount(dayAmount);
    onChange(range);
  };

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
            disabled={bookedDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
