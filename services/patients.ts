import { IPatientDashboardInfo } from "@/lib/interfaces";
import { dashboardData } from "@/lib/dashboardData";

export const fetchPatients = async (): Promise<IPatientDashboardInfo[]> => {
    const res = await fetch('/api/patients', {
      method: "GET"
    });
    if (!res.ok) {
      throw new Error('Failed to fetch patients');
    }
    const json = await res.json();
    console.log(json)
    return json.patients;
};

export const deletePatient = async (id: string): Promise<void> => {
  const res = await fetch(`/api/patients/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to delete patient with id ${id}`);
  }

  console.log(`Patient with id ${id} deleted successfully`);
};

export const seedPatients = async () => {
  try {
    console.log('start seeding')
    const res = await fetch('/api/patients', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dashboardData)
    });

    console.log('success')
    
  } catch (error) {
    console.log(error)
  }
}