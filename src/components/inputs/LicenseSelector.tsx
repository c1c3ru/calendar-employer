import { Button } from '../ui/button';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

const licenseTypes = [
  { label: "Licença-maternidade", value: "maternidade" },
  { label: "Licença-paternidade", value: "paternidade" },
  { label: "Licença para tratamento de saúde", value: "saude" },
  { label: "Licença para capacitação", value: "capacitacao" },
  { label: "Licença por afastamento do cônjuge", value: "conjuge" },
  { label: "Licença por acidente de serviço", value: "acidente" },
];

const mapLicenseTypeToDisplayTerm = (licenseType: string): string => {
  switch(licenseType) {
    case "Licença para tratamento de saúde":
      return "ATESTADO";
    case "Licença por afastamento do cônjuge":
      return "LICENÇA CÔNJUGE";
    default:
      return licenseType.toUpperCase();
  }
};

export const LicenseSelector = ({ onAddLicense }: {
  onAddLicense: (license: { 
    type: string; 
    start: Date; 
    end: Date;
    displayTerm: string 
  }) => void;
}) => {
  const [type, setType] = useState(licenseTypes[0].value);
  const [dates, setDates] = useState<{ start?: Date; end?: Date }>({});

  const handleAdd = () => {
    if (dates.start && dates.end) {
      const selectedLicense = licenseTypes.find(lt => lt.value === type)!;
      
      onAddLicense({
        type: selectedLicense.label,
        start: dates.start,
        end: dates.end,
        displayTerm: mapLicenseTypeToDisplayTerm(selectedLicense.label)
      });
      setDates({});
    }
  };

  return (
    <View style={{ marginVertical: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: '500' }}>Adicionar Licença</Text>
      <Picker
        selectedValue={type}
        onValueChange={setType}
        style={{ backgroundColor: 'white' }}
      >
        {licenseTypes.map((lt) => (
          <Picker.Item key={lt.value} label={lt.label} value={lt.value} />
        ))}
      </Picker>

      <DateRangePicker
        label="Período da Licença"
        onConfirm={(range) => setDates(range)}
      />

<Button
  onClick={handleAdd}
  disabled={!dates.start || !dates.end}
  variant="secondary"
>
  Adicionar Licença
</Button>
    </View>
  );
};