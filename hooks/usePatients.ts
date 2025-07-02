import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchPatients, deletePatient, createPatient, updatePatient } from '@/services/patients';
import { IPatientDashboardInfo, IPatientInitialInfo } from '@/lib/interfaces';



export function usePatients() {
  return useQuery<IPatientDashboardInfo[], Error>({
    queryKey: ['patients'],
    queryFn: fetchPatients,
    initialData: []
  });
}

export function usePatientMutations() {
  const queryClient = useQueryClient();

  const createPatientQuery = useMutation({
    mutationFn: (newPatient: IPatientInitialInfo) =>
      createPatient(newPatient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const updatePatientQuery = useMutation({
    mutationFn: ({ id, updatedPatient }: { id: string; updatedPatient: IPatientInitialInfo }) =>
      updatePatient(id, updatedPatient),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  const deletePatientQuery = useMutation({
    mutationFn: (id: string) =>
      deletePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });

  return {
    createPatientQuery,
    updatePatientQuery,
    deletePatientQuery
  };
}