import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPatients, deletePatient } from '@/services/patients';
import { IPatientDashboardInfo } from '@/lib/interfaces';



export function usePatients() {
  return useQuery<IPatientDashboardInfo[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    initialData: []
  });
}

export function usePatientMutations() {
  const queryClient = useQueryClient();

  // const createPatient = useMutation({
  //   mutationFn: (newPatient: Omit<Patient, 'id'>) =>
  //     axios.post<Patient>('/api/Patients', newPatient),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['Patients'] });
  //   },
  // });

  // const updatePatient = useMutation({
  //   mutationFn: (updatedPatient: Patient) =>
  //     axios.put<Patient>(`/api/Patients/${updatedPatient.id}`, updatedPatient),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['Patients'] });
  //   },
  // });

  const deletePatientQuery = useMutation({
    mutationFn: (id: string) =>
      deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  return {
    // createPatient,
    // updatePatient,
    deletePatientQuery
  };
}