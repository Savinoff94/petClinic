import { ModalMod } from "../../types"
import { Typography } from "@mui/material"
import { Add } from "@mui/icons-material"
import { Edit } from "@mui/icons-material"
import { Delete } from "@mui/icons-material"
import { usePatientMutations } from "@/hooks/usePatients"

interface IModalTitle {
    mode: ModalMod,
    patientId: null | string,
    handleClose: () => void,
}
 
export function ModalTitle({mode, patientId, handleClose} : IModalTitle) {
    const {deletePatientQuery} = usePatientMutations()
    return (
        <Typography
        className={`flex text-gray-600 gap-1 w-full mb-3 ${mode === 'create' ? 'justify-start' : 'justify-between'}`} 
        id="modal-modal-title"
        variant="h6"
        component="h2"
        >
            {
                mode === "create" && (
                    <>
                        <Add/>
                        <span>Add Patient</span>
                    </>
                )
            }
            {
                mode === "update" && (
                    <>
                        <section>
                            <Edit/>
                            <span>Update Patient</span>
                        </section>
                        <button
                            className="hover:bg-slate-200 ease-in transition duration-300 p-1 rounded"
                            onClick={() => {
                                if(!patientId) return
                                deletePatientQuery.mutate(patientId)
                                handleClose()
                            }}
                        >
                            <Delete/>
                        </button>
                    </>
                )
            }
        </Typography>
    )
}