import { HolidayService } from '../calendar/holidayService';
import { DaySchedule, LicensePeriod, VacationPeriod } from '../../types/schedule';
import { isWeekend, format, isWithinRange } from 'date-fns';
import { generateRandomTime } from '../utils/timeUtils'; 
import { getDaysInMonth } from '../date/dateUtils';

interface ScheduleTimes {
  morningEntry: string;
  morningExit: string;
  afternoonEntry: string;
  afternoonExit: string;
}

export const generateSchedule = (
  year: number, 
  month: number, 
  vacation: VacationPeriod | undefined, 
  licenses: LicensePeriod[]
): DaySchedule[] => {
  const daysInMonth: number = getDaysInMonth(year, month);
  const holidays: string[] = HolidayService.getAllHolidays(year);
  
  return Array.from({ length: daysInMonth }, (_, i): DaySchedule => {
    const day: number = i + 1;
    const currentDate: Date = new Date(year, month - 1, day);
    const formattedDate: string = format(currentDate, 'dd/MM');
    
    const license = licenses.find(l =>
      isWithinRange(currentDate, l.start, l.end)
    );

    const isVacationDay = vacation && 
  isWithinRange(currentDate, vacation.start, vacation.end);

    const isHoliday: boolean = holidays.includes(formattedDate);
    const weekend: boolean = isWeekend(currentDate);

    let displayTerm: string | undefined;
    if (license) displayTerm = license.displayTerm;
    else if (isVacationDay) displayTerm = 'Férias';
    else if (isHoliday) displayTerm = 'Feriado';
    else if (weekend) displayTerm = format(currentDate, 'EEEE');

    const times: ScheduleTimes = displayTerm ? {
      morningEntry: displayTerm,
      morningExit: displayTerm,
      afternoonEntry: displayTerm,
      afternoonExit: displayTerm,
    } : {
      morningEntry: generateRandomTime(7, 55, 8, 5),
      morningExit: generateRandomTime(11, 55, 12, 5),
      afternoonEntry: generateRandomTime(12, 55, 13, 5),
      afternoonExit: generateRandomTime(16, 55, 17, 5),
    };

    return {
      day,
      month,
      year,
      isWeekend: weekend,
      isHoliday,
      isVacation: !!isVacationDay,
      isLicense: !!license,
      licenseTerm: displayTerm,
      times
    };
  });
};