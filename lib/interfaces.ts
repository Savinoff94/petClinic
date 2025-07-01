export interface IPatient {
  name: string;
  phone: string;
  petName: string,
  petBirthDate: Date
}

export const petTypes = ['cat', 'dog', 'parrot', 'snake', 'gold fish'] as const;

export type PetType = typeof petTypes[number]

export interface IPetType {
  petType: PetType
}

export interface IPatientDashboardInfo extends IPatient, IPetType {}