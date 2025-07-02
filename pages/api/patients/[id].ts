// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatientDashboardInfo, ILeanPatientDashboardInfo, IPatientInitialInfo } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import { PatientModel } from "@/lib/models/Patient";
import { petTypes } from "@/lib/interfaces";
import { toPatientResponseDTO } from "@/lib/helpers";

interface PatientResult {
  pateints?: Array<IPatientDashboardInfo> | IPatientDashboardInfo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>,
) {
  await db()
  if (req.method === "DELETE") {
    return await del(req, res);
  }
  if (req.method === "PATCH") {
    return await update(req, res);
  }
}


const del = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    console.log(`ID: ${id}`)

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Patient ID is required and must be a string." });
    }

    const deletedPatient = await PatientModel.findByIdAndDelete(id);

    if (!deletedPatient) {
      return res.status(404).json({ error: `Patient with ID ${id} not found.` });
    }

    res.status(200).json({ message: `Patient with ID ${id} deleted successfully.` });
  } catch (error) {
    console.error("Failed to delete patient:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const update = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Patient ID is required and must be a string." });
    }

    const {
      name,
      phone,
      petName,
      petType,
      petBirthDate,
    } = req.body as Partial<IPatientInitialInfo>;

    const updateData: Record<string, any> = {};

    if (name !== undefined) updateData.name = name;
    if (phone !== undefined) updateData.phone = phone;
    if (petName !== undefined) updateData.petName = petName;

    if (petType !== undefined) {
      if (!petTypes.includes(petType)) {
        return res.status(400).json({ error: `Invalid pet type: ${petType}` });
      }
      updateData.petType = petType;
    }

    if (petBirthDate !== undefined) {
      const petBirthDateObj = new Date(petBirthDate);
      if (isNaN(petBirthDateObj.getTime())) {
        return res.status(400).json({ error: "Invalid petBirthDate format." });
      }
      updateData.petBirthDate = petBirthDateObj;
    }

    const updatedPatient = await PatientModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).lean<ILeanPatientDashboardInfo | null>();

    if (!updatedPatient) {
      return res.status(404).json({ error: `Patient with ID ${id} not found.` });
    }

    const patientWithId = toPatientResponseDTO(updatedPatient)

    res.status(200).json({ patient: patientWithId });
  } catch (error) {
    console.error("Failed to update patient:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
