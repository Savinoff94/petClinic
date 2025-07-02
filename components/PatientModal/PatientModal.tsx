import { Modal } from "@mui/material"
import { Box } from "@mui/material"
import { type ModalMod } from "./types"
import { ModalTitle } from "./components/ModalTitle/ModalTitle"
import { ModalForm } from "./components/ModalForm/ModalForm"


interface IPatientModal {
    isOpen: boolean,
    handleClose: () => void,
    mode: ModalMod,
    patientId: null | string,
}

export function PatientModal({isOpen, handleClose, mode, patientId}: IPatientModal) {
    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="my-1"
        >
            <Box
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-4 rounded-lg shadow-lg w-full max-w-md bg-white flex-col"
            >
                <ModalTitle
                    mode={mode}
                    patientId={patientId}
                    handleClose={handleClose}
                />
                <ModalForm
                    handleClose={handleClose}
                    patientId={patientId}
                />
                
            </Box>
        </Modal>
    )
}

