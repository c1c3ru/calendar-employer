import { addDays, format } from 'date-fns';
import { calculateEaster } from './easterCalculator';

export class HolidayService {
  static getMovableHolidays(year: number): Record<string, Date> {
    const easter = calculateEaster(year);
    return {
      Carnaval: addDays(easter, -47),
      SextaFeiraSanta: addDays(easter, -2),
      CorpusChristi: addDays(easter, 60),
    };
  }

  static getFixedHolidays(): string[] {
    return [
      '01/01',
      '21/04', 
      '01/05',
      '13/06',
      '07/09',
      '12/10',
      '02/11',
      '15/11',
      '25/12',
    ];
  }

  static getAllHolidays(year: number): string[] {
    const movable = Object.values(this.getMovableHolidays(year))
      .map(d => format(d, 'dd/MM'));
    return [...this.getFixedHolidays(), ...movable];
  }
}