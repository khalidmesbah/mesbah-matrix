'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DatePicker from '@/components/widgets/date-picker'; // Assuming DatePicker is imported from chadcn/ui
import { useEffect, useState } from 'react';

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

type TimeSinceBirthProps = {
  birthDate: string;
};

const TimeSinceBirth: React.FC<TimeSinceBirthProps> = ({ birthDate }) => {
  const [timePassed, setTimePassed] = useState<Partial<TimePassed>>({});
  const [selectedUnit, setSelectedUnit] = useState<string>(''); // Track the selected unit

  // Track the birth date input
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const calculateTimePassed = () => {
    const now = new Date();
    const birth = selectedDate || new Date(birthDate);
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
  };

  useEffect(() => {
    calculateTimePassed();
    const intervalId = setInterval(calculateTimePassed, 1000); // Update every second
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [birthDate, selectedDate]);

  // Render selected unit's time value outside the select dropdown
  const getTimeValue = () => {
    if (selectedUnit && timePassed[selectedUnit as keyof TimePassed] !== undefined) {
      return `${timePassed[selectedUnit as keyof TimePassed]}`;
    }
    return 'Select a unit to display time';
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Time Passed Since Birth:</h2>

      {/* Date picker input */}
      <div className="mb-4">
        <DatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} />
      </div>

      {/* Select for time units */}
      <div className="mb-4">
        <Select onValueChange={setSelectedUnit}>
          <SelectTrigger className="w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <SelectValue placeholder="Select time unit" />
          </SelectTrigger>
          <SelectContent className="rounded-lg border border-gray-200 bg-white shadow-lg">
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

      {/* Display time value */}
      <div className="rounded-lg bg-gray-100 p-4 text-center text-lg font-semibold text-gray-700">
        {getTimeValue()}
      </div>
    </div>
  );
};

export default TimeSinceBirth;
