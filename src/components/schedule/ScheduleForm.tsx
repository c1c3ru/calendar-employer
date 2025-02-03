import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { View } from 'react-native';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { DateRangePicker } from '../inputs/DateRangePicker';
import { LicenseSelector } from '../inputs/LicenseSelector';

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

const formSchema = z.object({
  year: z.number().min(2000).max(2100),
  month: z.number().min(1).max(12),
  vacation: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  licenses: z.array(z.object({
    type: z.string(),
    start: z.date(),
    end: z.date(),
    displayTerm: z.string()
  })).optional(),
});

export type ScheduleFormValues = z.infer<typeof formSchema>;

export const ScheduleForm = ({ onSubmit }: {
  onSubmit: (values: ScheduleFormValues) => void;
}) => {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
    },
  });

  const handleAddLicense = (license: { type: string; start: Date; end: Date }) => {
    const licenseWithDisplayTerm = {
      ...license,
      displayTerm: mapLicenseTypeToDisplayTerm(license.type)
    };
    
    form.setValue('licenses', [
      ...(form.watch('licenses') || []),
      licenseWithDisplayTerm
    ]);
  };

  return (
    <Form {...form}>
      <View style={{ marginVertical: 16 }}>
      <FormField
  control={form.control}
  name="year"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Ano</FormLabel>
      <Input
        value={field.value.toString()}
        onChange={(e) => field.onChange(Number(e.target.value))}
        type="number"
      />
      <FormMessage />
    </FormItem>
  )}
/>

<FormField
  control={form.control}
  name="month"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Mês</FormLabel>
      <Input
        value={field.value.toString()}
        onChange={(e) => field.onChange(Number(e.target.value))}
        type="number"
      />
      <FormMessage />
    </FormItem>
  )}
/>

<Button 
  onClick={form.handleSubmit(onSubmit)}
  variant="secondary"
>
  Gerar Escala
</Button>
      </View>
    </Form>
  );
};