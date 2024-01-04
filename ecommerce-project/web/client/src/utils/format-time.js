import { format, formatDistanceToNow, getTime, setDay, setHours, startOfWeek, parseISO } from 'date-fns';

export const nameDaysOfWeek = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

export const timeLine = [
  { label: '08:00 - 10:00', value: 10 },
  { label: '10:00 - 12:00', value: 12 },
  { label: '12:00 - 14:00', value: 14 },
  { label: '14:00 - 16:00', value: 16 },
  { label: '16:00 - 18:00', value: 18 },
  { label: '18:00 - 20:00', value: 20 },
];

export function getTimeLine(date) {
  const currentDate = new Date();

  if (date === currentDate.getDay()) {
    return timeLine.filter((item) => item.value > currentDate.getHours());
  }
  return timeLine;
}

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd/MM/yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fGetDateOnly(date) {
  return date ? format(date, 'yyyy-MM-dd') : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fStringToDate(date) {
  return parseISO(date);
}

export function fGetTimeForDayOfWeek(dayOfWeek, hour) {
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now);
  const targetDate = setDay(startOfCurrentWeek, dayOfWeek);
  const targetDateTime = setHours(targetDate, hour);
  return targetDateTime;
}
