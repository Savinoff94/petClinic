import { useQuery } from '@tanstack/react-query';
import { fetchPatients } from '@/services/patients';
import { IPatient } from '@/lib/interfaces';



export function usePatients() {
  return useQuery<IPatient[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    initialData: []
  });
}