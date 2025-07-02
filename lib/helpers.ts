import { ILeanPatientDashboardInfo, IPatientDashboardInfo } from "@/lib/interfaces";

export function yearsSince(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString
    }
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
  
    const msInYear = 1000 * 60 * 60 * 24 * 365;
    const res = Math.floor(diffInMs / msInYear)
    return String(res > 0 ? res : 0);
}

export const formatDateForInput = (isoDate: string | Date): string => {
    const date = typeof isoDate === 'string' ? new Date(isoDate) : isoDate;
  
    if (isNaN(date.getTime())) return '';
  
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
};


export const toPatientResponseDTO = (
  patient: ILeanPatientDashboardInfo
): IPatientDashboardInfo => {
    const { _id, ...rest } = patient;
    return {
        ...rest,
        id: _id.toString(),
    };
};