'use client';

import { Button } from '@/components/ui/button';

import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useWidgetsStore from '@/lib/stores/widgets';
import { TimePassedWidgetT } from '@/lib/types/widgets';
import { DialogClose } from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Settings } from 'lucide-react';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

type TimePassed = {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  weeks: number;
  months: number;
  years: number;
  winters: number;
  springs: number;
  summers: number;
  falls: number;
};

export default function TimeSinceBirth({ id }: { id: string }) {
  const DEFAULT_TIME_SINCE_BIRTH_DATA: TimePassedWidgetT = {
    selectedUnit: 'seconds',
    date: `${new Date()}`,
  };
  const { widgetStates, updateWidgetState } = useWidgetsStore((state) => state);
  const [timePassed, setTimePassed] = useState<Partial<TimePassed>>({});
  const [selectedUnit, setSelectedUnit] = useState<string>('seconds');
  const [date, setDate] = useState<Date>(new Date());

  useLayoutEffect(() => {
    if (!widgetStates[id]) updateWidgetState(id, DEFAULT_TIME_SINCE_BIRTH_DATA);
    const data = widgetStates[id] as TimePassedWidgetT;
    setSelectedUnit(data.selectedUnit);
    setDate(new Date(data.date));
  }, []);

  const calculateTimePassed = useCallback(() => {
    const now = new Date();
    const birth: Date = date || new Date();
    const diff = now.getTime() - birth.getTime();

    // Calculate time in different units
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const years = now.getFullYear() - birth.getFullYear();
    const months = years * 12 + (now.getMonth() - birth.getMonth());

    // Calculate seasons based on months
    const winters = Math.floor(months / 12); // Winter is considered to be the start of the year
    const springs = Math.floor(months / 12);
    const summers = Math.floor(months / 12);
    const falls = Math.floor(months / 12);

    setTimePassed({
      seconds,
      minutes,
      hours,
      days,
      weeks,
      months,
      years,
      winters,
      springs,
      summers,
      falls,
    });
  }, [date]);

  useEffect(() => {
    calculateTimePassed();
    const intervalId = setInterval(calculateTimePassed, 1000);
    return () => clearInterval(intervalId);
  }, [date, calculateTimePassed]);

  const getTimeValue = () => {
    if (selectedUnit && timePassed[selectedUnit as keyof TimePassed] !== undefined) {
      return `${timePassed[selectedUnit as keyof TimePassed]}`;
    }
    return 'Select a unit to display time';
  };

  return (
    <div className="relative flex flex-col gap-2 rounded-md">
      <Dialog>
        <DialogTrigger asChild className="absolute top-2 right-2">
          <Button variant="ghost" size="icon">
            <Settings />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={'outline'}>
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  captionLayout="dropdown"
                  labels={{
                    labelYearDropdown: () => 'Year ',
                    labelMonthDropdown: () => 'Month ',
                  }}
                  classNames={{
                    caption_label: 'hidden',
                  }}
                  selected={date}
                  mode="single"
                  footer={false}
                  onDayClick={(day) => {
                    setDate(day);
                  }}
                />
              </PopoverContent>
            </Popover>

            <Select onValueChange={setSelectedUnit} value={selectedUnit}>
              <SelectTrigger className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-hidden">
                <SelectValue placeholder="Select time unit" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border border-gray-200 shadow-lg">
                <SelectItem value="seconds">Seconds</SelectItem>
                <SelectItem value="minutes">Minutes</SelectItem>
                <SelectItem value="hours">Hours</SelectItem>
                <SelectItem value="days">Days</SelectItem>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
                <SelectItem value="years">Years</SelectItem>
                <SelectItem value="winters">Winters</SelectItem>
                <SelectItem value="springs">Springs</SelectItem>
                <SelectItem value="summers">Summers</SelectItem>
                <SelectItem value="falls">Falls</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={() => updateWidgetState(id, { selectedUnit, date: `${date}` })}
              >
                save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="bg-accent text-primary rounded-lg p-2 text-center text-lg font-bold">
        <h2 className="font-bolder text-4xl">{getTimeValue()}</h2>
        <span className="text-primary/90">
          {selectedUnit.slice(0, 1).toUpperCase() + selectedUnit.slice(1)} Have Passed
        </span>
      </div>
    </div>
  );
}
