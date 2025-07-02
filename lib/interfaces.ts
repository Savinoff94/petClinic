import { Types } from 'mongoose';
export interface IPatient {
  name: string;
  phone: string;
}

export const petTypes = ['cat', 'dog', 'parrot', 'snake', 'gold fish'] as const;

export type PetType = typeof petTypes[number]

export interface IPet {
  petType: PetType,
  petName: string,
  petBirthDate: string
  // petBirthDate: Date
}

export interface IMongoId {
_id: Types.ObjectId;
}

export interface IID {
  id: string
}

export interface IPatientInitialInfo extends IPatient, IPet {} 

export interface ILeanPatientDashboardInfo extends IPatient, IMongoId, IPet {}

export interface IPatientDashboardInfo extends IPatient, IID, IPet {}