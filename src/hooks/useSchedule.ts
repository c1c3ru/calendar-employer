import { generateSchedule } from '../lib/schedule/scheduleGenerator';
import { useState, useMemo } from 'react';
import { HolidayService } from '../lib/calendar/holidayService';
import { LicensePeriod, VacationPeriod } from '../types/schedule';

export const useSchedule = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [vacation, setVacation] = useState<VacationPeriod | null>(null);
  const [licenses, setLicenses] = useState<LicensePeriod[]>([]);

  const schedule = useMemo(() => 
    generateSchedule(year, month, vacation || undefined, licenses),
  [year, month, vacation, licenses]);

  const holidays = useMemo(() => 
    HolidayService.getAllHolidays(year), [year]);

 

  return {
    year,
    month,
    setYear,
    setMonth,
    vacation,
    setVacation,
    licenses,
    setLicenses,
    schedule,
    holidays,
  };
}

