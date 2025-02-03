import { Table, TableHead, TableBody, TableRow, TableCell } from '../ui/table';
import { DaySchedule } from '../../types/schedule';

export const ScheduleTable = ({ days }: { days: DaySchedule[] }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHead>Dia</TableHead>
          <TableHead>Entrada</TableHead>
          <TableHead>Saída</TableHead>
          <TableHead>Entrada</TableHead>
          <TableHead>Saída</TableHead>
        </TableRow>
      </TableHead>
      <TableBody>
        {days.map(day => (
          <TableRow key={`${day.day}-${day.month}`}>
            <TableCell>{`${day.day.toString().padStart(2, '0')}/${day.month.toString().padStart(2, '0')}`}</TableCell>
            <TableCell>{day.times.morningEntry}</TableCell>
            <TableCell>{day.times.morningExit}</TableCell>
            <TableCell>{day.times.afternoonEntry}</TableCell>
            <TableCell>{day.times.afternoonExit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};