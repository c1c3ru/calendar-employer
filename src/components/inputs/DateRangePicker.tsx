import { Calendar } from '../ui/calendar';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react-native';
import { View, Text } from 'react-native-web';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const DateRangePicker = ({
  label,
  onConfirm,
}: {
  label: string;
  onConfirm: (range: { start: Date; end: Date }) => void;
}) => {
  const [dates, setDates] = useState<{ start?: Date; end?: Date }>({});
  const [open, setOpen] = useState(false);


  return (
    <View>
      <Text style={{ fontSize: 14, fontWeight: '500', marginBottom: 4 }}>{label}</Text>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger>
          <Button variant="outline" className="w-full justify-start">
            <CalendarIcon style={{ marginRight: 8, height: 16, width: 16 }} />
            {dates.start ? (
              dates.end ? (
                `${format(dates.start, 'dd/MM/yy')} - ${format(dates.end, 'dd/MM/yy')}`
              ) : (
                format(dates.start, 'dd/MM/yy')
              )
            ) : (
              'Selecione o período'
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
        <Calendar
  mode="range"
  selected={{
    from: dates.start,
    to: dates.end
  }}
  onSelect={(range) => {
    if (range?.from && range?.to) {
      setDates({ start: range.from, end: range.to });
    }
  }}
  locale={ptBR}
/>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 8 }}>
            <Button
              onClick={() => {
                if (dates.start && dates.end) {
                  onConfirm({ start: dates.start, end: dates.end });
                  setOpen(false);
                }
              }}
              disabled={!dates.start || !dates.end}
            >
              Confirmar
            </Button>
          </View>
        </PopoverContent>
      </Popover>
    </View>
  );
};
