import { useSchedule } from './hooks/useSchedule';
import { ScheduleTable } from './components/schedule/ScheduleTable';
import { ScheduleForm } from './components/schedule/ScheduleForm'; // Importe o ScheduleForm
import { View } from 'react-native';
import { Text } from 'react-native';

export default function App() {
  const {
    schedule,
    setYear,
    setMonth,
    setVacation,
    setLicenses
  } = useSchedule();

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Gerador de Escala
      </Text>

      <ScheduleForm 
        onSubmit={(values) => {
          setYear(values.year);
          setMonth(values.month);
          setVacation(values.vacation || null);
          setLicenses(values.licenses || []);
        }}
      />
      
      <ScheduleTable days={schedule} />
    </View>
  );
}