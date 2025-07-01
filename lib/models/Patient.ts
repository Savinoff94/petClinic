import mongoose, { Schema, model, models } from 'mongoose';
import { IPatientDashboardInfo, petTypes } from '../interfaces';

const PatientSchema: Schema<IPatientDashboardInfo> = new Schema(
  {
    name: {type: String, required: true},
    phone: {type: String, required: true},
    petName: {type: String, required: true},
    petBirthDate: {type: Date, required: true},
    petType: { 
      type: String, 
      required: true, 
      enum: petTypes as unknown as string[]
    },
  },
  {
    timestamps: true,
  }
);

export const PatientModel =
  models.Patient || model<IPatientDashboardInfo>('Patient', PatientSchema);