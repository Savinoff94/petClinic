// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatientDashboardInfo, ILeanPatientDashboardInfo } from "@/lib/interfaces";
import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/lib/db";
import { PatientModel } from "@/lib/models/Patient";

interface PatientResult {
  pateints?: Array<IPatientDashboardInfo> | IPatientDashboardInfo;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PatientResult>,
) {
  await db()
  if (req.method === "DELETE") {
    console.log("DELETE")
    return await del(req, res);
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
