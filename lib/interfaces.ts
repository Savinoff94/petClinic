export interface IPatient {
  name: string;
  phone: string;
  petName: string,
  petBirthDate: Date
}

export const petTypes = ['cat', 'dog', 'parrot', 'snake', 'gold fish'] as const;

export interface IPetType {
  petType: typeof petTypes[number]
}

export interface IPatientDashboardInfo extends IPatient, IPetType {}