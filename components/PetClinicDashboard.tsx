import { usePatients } from "@/hooks/usePatients";
import { PatientModal } from "./PatientModal/PatientModal";
import { usePatientModal } from "./PatientModal/hooks/usePatientModal";
import Table from "./Table/Table";
import { Button } from "@mui/material";
import { Title } from "./Title/Title";

export const PetClinicDashboard = () => {
  const {data} = usePatients()
  const { isOpen, patientId, openModal, closeModal } = usePatientModal()
  return (
    <div className="h-screen w-screen text-gray-600 font-mono bg-main">
      <div className="grid grid-rows-auto-1fr gap-y-4 p-4 md:p-8 mx-auto max-w-7xl">
        <Title />
        <Table
          data={data}
          actionClickHandle={openModal}
        />
        <Button
          className="bg-slate-200 text-gray-600 font-mono hover:bg-slate-300 ease-in"
          variant="contained"
          onClick={() => openModal(null)}
        >
          Create
        </Button>
        <PatientModal
          isOpen={isOpen}
          handleClose={() =>closeModal()}
          mode={patientId ? 'update' : 'create'}
          patientId={patientId}
        />
      </div>
    </div>
    
  );
};
