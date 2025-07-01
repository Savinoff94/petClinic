import { IPatient } from "@/lib/interfaces";
import { dashboardData } from "@/lib/dashboardData";

export const fetchPatients = async (): Promise<IPatient[]> => {
    const res = await fetch('/api/patients', {
        method: "GET"
    });
    if (!res.ok) {
      throw new Error('Failed to fetch patients');
    }
    const json = await res.json();
    return json.patients;
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