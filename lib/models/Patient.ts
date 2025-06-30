import mongoose, { Schema, model, models } from 'mongoose';
import { IPatient } from '../interfaces';

const PatientSchema: Schema<IPatient> = new Schema(
  {
    name: {type: String, required: true},
    phone: {type: String, required: true},
    petName: {type: String, required: true},
    petBirthDate: {type: Date, required: true},
  },
  {
    timestamps: true,
  }
);

export const PatientModel =
  models.Patient || model<IPatient>('Patient', PatientSchema);