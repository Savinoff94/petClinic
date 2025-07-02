// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatientDashboardInfo, ILeanPatientDashboardInfo, IPatientInitialInfo } from "@/lib/interfaces";
import { petTypes } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import { PatientModel } from "@/lib/models/Patient";
import { toPatientResponseDTO } from "@/lib/helpers";

interface PatientResult {
  pateints?: Array<IPatientDashboardInfo> | IPatientDashboardInfo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>,
) {
  await db()
  if (req.method === "POST") {
    return await create(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, phone, petType, petName, petBirthDate } = req.body as IPatientInitialInfo;

    if (!name || !phone || !petType || !petName || !petBirthDate) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    if (!petTypes.includes(petType)) {
      return res.status(400).json({ error: `Invalid pet type: ${petType}` });
    }

    const petBirthDateObj = new Date(petBirthDate);
    if (isNaN(petBirthDateObj.getTime())) {
      return res.status(400).json({ error: 'Invalid petBirthDate format.' });
    }

    const newPatient = await PatientModel.create({
      name,
      phone,
      petType,
      petName,
      petBirthDate: petBirthDateObj,
    });

    const patientWithId = toPatientResponseDTO(newPatient);

    res.status(201).json({ patient: patientWithId });
  } catch (error) {
    console.error('Failed to create patient:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const read = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const patients = await PatientModel.find().lean<ILeanPatientDashboardInfo[]>();

    const patientsWithId = patients.map((patient) => toPatientResponseDTO(patient));

    res.status(200).json({ patients: patientsWithId });
  } catch (error) {
    console.error('Failed to read patients:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
  
};