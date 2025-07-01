// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IPatientDashboardInfo } from "@/lib/interfaces";
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
  if (req.method === "POST") {
    return await create(req, res);
  }
  if (req.method === "GET") {
    return await read(req, res);
  }
  if (req.method === "DELETE") {
    return await del(req, res);
  }
}

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  // create patient
};
const read = async (req: NextApiRequest, res: NextApiResponse) => {
  const patients = await PatientModel.find();
  res.status(200).json({ patients });
};
const del = async (req: NextApiRequest, res: NextApiResponse) => {
  // delete from database
};
