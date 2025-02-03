import { 
  getDaysInMonth as dateFnsDays, 
  format, 
  parse, 
  isWithinRange 
} from 'date-fns';

export const getDaysInMonth = (year: number, month: number): number => {
  return dateFnsDays(new Date(year, month - 1));
};

export const parseDate = (dateString: string, formatStr: string = 'dd/MM/yyyy'): Date => {
  return parse(dateString, formatStr, new Date());
};

export const isDateInRange = (
  date: Date,
  range: { start: Date; end: Date }
): boolean => {
  return isWithinRange(date, range.start, range.end);
};

export const formatDate = (date: Date, formatStr: string = 'dd/MM/yyyy'): string => {
  return format(date, formatStr);
};