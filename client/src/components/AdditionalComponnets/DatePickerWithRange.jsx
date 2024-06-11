import * as React from 'react';
import { addDays, format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './button.jsx';
import { Calendar } from './calendar.jsx';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './popover.jsx';

export default function DatePickerWithRange({ className, setDateRange }) {
  const [date, setDate] = React.useState({
    from: new Date(),
    to: addDays(Date.now(), 5),
  });

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  React.useEffect(() => {
    if (!date) {
      setDate({ from: new Date(), to: new Date() });
    } else {
      setDateRange(date);
    }
  }, [date]);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger
          asChild
          className="border-none text-black hover:bg-transparent"
        >
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{'>'}{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-base font-semibold">Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={1}
            disabled={(date) =>
              date < new Date().setDate(new Date().getDate() - 1)
            }
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}