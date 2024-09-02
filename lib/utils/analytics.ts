export function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getLast7Days() {
  const days = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i); // Subtract days from today
    days.unshift(date.toISOString().split('T')[0]); // Format as YYYY-MM-DD
  }

  return days;
}

export function getLast7Weeks() {
  const weeks = [];
  const weekMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const weekStart = new Date(today.getTime() - i * weekMs);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay());

    const formattedDate = `${weekStart.getFullYear()}-${(weekStart.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${weekStart.getDate().toString().padStart(2, '0')}`;

    weeks.unshift(formattedDate);
  }

  return weeks;
}

export function getLast7Months() {
  const months = [];
  const currentDate = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);

    const formattedMonth = `${String(date.getMonth() + 1).padStart(2, '0')}`;

    months.unshift(formattedMonth);
  }

  return months;
}

export const getMonthName = (monthNumber: string) => {
  const index = parseInt(monthNumber, 10) - 1;
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ][index].slice(0, 3);
};

export const getDayName = (dayNumber: string) => {
  return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
    +dayNumber
  ].slice(0, 3);
};

export function getOrdinalSuffix(number: number) {
  const remainder = number % 10;
  const exception = number % 100;

  if (exception >= 11 && exception <= 13) {
    return number + 'th';
  }

  switch (remainder) {
    case 1:
      return number + 'st';
    case 2:
      return number + 'nd';
    case 3:
      return number + 'rd';
    default:
      return number + 'th';
  }
}
