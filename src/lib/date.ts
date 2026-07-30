export const todayKey = () => toDateKey(new Date());

export const toDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const addDays = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const getWeekDates = (anchor = new Date()) => {
  const date = new Date(anchor);
  const day = date.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  const monday = addDays(date, mondayOffset);
  return Array.from({ length: 7 }, (_, index) => toDateKey(addDays(monday, index)));
};

export const weekKey = (anchor = new Date()) => {
  const [monday] = getWeekDates(anchor);
  return monday;
};

export const isSameDayKey = (value: string | undefined, key: string) => value?.slice(0, 10) === key;
