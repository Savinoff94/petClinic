import mongoose, { Schema, model, models } from 'mongoose';
import { IPatientDashboardInfo, petTypes } from '../interfaces';

interface IPatientDashboardInfoDoc extends IPatientDashboardInfo, Document {}

const PatientSchema = new Schema<IPatientDashboardInfoDoc>(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    petName: { type: String, required: true },
    petBirthDate: { type: Date, required: true },
    petType: {
      type: String,
      required: true,
      enum: petTypes,
    },
  },
  {
    timestamps: true,
  }
);

export const PatientModel =
  models.Patient || model<IPatientDashboardInfoDoc>('Patient', PatientSchema);