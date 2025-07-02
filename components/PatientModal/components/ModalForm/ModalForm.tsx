import { TextField } from '@mui/material'
import { FormLabel } from "@mui/material"
import { Button } from "@mui/material"
import { Select } from "@mui/material"
import { FormControl } from '@mui/material'
import { MenuItem } from "@mui/material"
import { petTypes } from "@/lib/interfaces"
import { IPatientInitialInfo } from '@/lib/interfaces'
import { usePatients } from '@/hooks/usePatients'
import { useEffect, useState } from 'react'
import { SelectChangeEvent } from '@mui/material'

interface IModalForm {
    handleClose: () => void,
    handleSubmit: () => void,
    patientId: string | null
}

const today = new Date()

const initialPatientInfo: IPatientInitialInfo = {
    name: '',
    phone: '',
    petType: 'dog',
    petName: '',
    petBirthDate: today.toISOString()
}


export function ModalForm({handleClose, handleSubmit, patientId}: IModalForm) {
    const [patientInfo, setPatientInfo] = useState<IPatientInitialInfo>(initialPatientInfo)
    const {data} = usePatients()

    useEffect(() => {
        if(patientId) {
            const selectedPatientInfo = data.find((info) => info.id === patientId)
            if(selectedPatientInfo) {
                setPatientInfo(selectedPatientInfo)
            }
        }
        if(!patientId) {
            setPatientInfo(initialPatientInfo)
        }

    }, [patientId, data, setPatientInfo])

    const handleChange = (field: keyof IPatientInitialInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPatientInfo(prev => ({
            ...prev,
            [field]: e.target.value,
        }));
    };
    const handleSelectChange = (e: SelectChangeEvent) => {
        setPatientInfo(prev => ({
            ...prev,
            petType: e.target.value as IPatientInitialInfo['petType'],
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
        >
            <FormControl fullWidth className="mb-4">
                <FormLabel>Name</FormLabel>
                <TextField
                placeholder="e.g. Ben Saraf"
                variant="outlined"
                value={patientInfo.name}
                onChange={handleChange('name')}
                required
                />
            </FormControl>

            <FormControl fullWidth className="mb-4">
                <FormLabel>Phone</FormLabel>
                <TextField
                type="tel"
                placeholder="e.g. +1 234 567 8901"
                variant="outlined"
                slotProps={{
                    input: {
                        inputProps: {
                            pattern: "\\+?[0-9\\s]{7,15}",
                            title: "Enter a valid phone number",
                        },
                    },
                }}
                value={patientInfo.phone}
                onChange={handleChange("phone")}
                required
                />
            </FormControl>

            <FormControl fullWidth className="mb-4">
                <FormLabel>Pet Name</FormLabel>
                <TextField
                placeholder="e.g. Tutti"
                variant="outlined"
                value={patientInfo.petName}
                onChange={handleChange("petName")}
                required
                />
            </FormControl>

            <FormControl fullWidth className="mb-4">
                <FormLabel>Date</FormLabel>
                <TextField
                type="date"
                variant="outlined"
                value={patientInfo.petBirthDate}
                onChange={handleChange("petBirthDate")}
                required
                />
            </FormControl>

            <FormControl fullWidth className="mb-4">
                <FormLabel>Animal Type</FormLabel>
                <Select
                value={patientInfo.petType}
                onChange={handleSelectChange}
                displayEmpty
                variant="outlined"
                required
                >
                    {
                        petTypes.map((petType) => (
                            <MenuItem key={petType} value={petType}>{petType}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>

            <div className="flex w-full justify-center gap-3">
                <Button
                    className="text-black" 
                    type="submit" 
                    variant="contained"
                >
                    Submit
                </Button>
                <Button
                    className="text-black border-gray-300" 
                    type="button" 
                    variant="outlined"
                    onClick={handleClose}
                >
                    Close
                </Button>
            </div>
        </form>
    )
}