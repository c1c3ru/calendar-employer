export type DaySchedule = {
    day: number;
    month: number;
    year: number;
    isWeekend: boolean;
    isHoliday: boolean;
    isVacation: boolean;
    licenseTerm?: string;
    isLicense: boolean;
    times: {
      morningEntry: string;
      morningExit: string;
      afternoonEntry: string;
      afternoonExit: string;
    };
  };
  
  export type LicensePeriod = {
    type: string;
    start: Date;
    end: Date;
    displayTerm: string;
  };
  
  export type VacationPeriod = {
    start: Date;
    end: Date;
  };

  