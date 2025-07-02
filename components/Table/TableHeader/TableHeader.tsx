
import {
    Header,
    flexRender
} from '@tanstack/react-table';
import { MenuItem } from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import Arrows from './Arrows/Arrows';
import { TextField } from '@mui/material';
import FloatingMenu from '../../FloatingMenu/FloatingMenu';
import { FilterList } from '@mui/icons-material';
import { petTypes } from '@/lib/interfaces';
import { useState } from 'react';
import { PetType } from '@/lib/interfaces';
  
export interface TableHeaderProps<TData extends object, TValue> {
    header: Header<TData, TValue>;
}

export function TableHeader<TData extends object, TValue>({
    header,
}: TableHeaderProps<TData, TValue>) {

    if(header.id === 'name' || header.id === 'petName') {
        return <TableHeaderSortableFilterText header={header}/>
    }
    else if(header.id === 'petType') {
        return <TableHeaderMenuFilter header={header}/>
    }
    else {
        return <TableHeaderNonAction header={header}/>
    }
}

function TableHeaderSortableFilterText<TData extends object, TValue>({
    header,
}: TableHeaderProps<TData, TValue>) {
    const filterValue = header.column.getFilterValue() as string || '';
    return (
        <div
            key={header.id}
            className='flex justify-center flex-col h-14 gap-1 pt-2'
        >   
            <button
                className='flex h-full justify-between items-center'
                onClick={header.column.getToggleSortingHandler()}
            >
                {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
                <Arrows
                    direction={header.column.getIsSorted()}
                />
            </button>
            
            <TextField
                value={filterValue}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
                size='small'
                variant="standard"
            />
        </div>
    );
}

function TableHeaderNonAction<TData extends object, TValue>({
    header,
    }: TableHeaderProps<TData, TValue>) {
    return (
        <div
            key={header.id}
            className='flex h-full pb-1'
        >
            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}
        </div>
    );
}

function TableHeaderMenuFilter<TData extends object, TValue>({
    header,
    }: TableHeaderProps<TData, TValue>) {
    const [selectedPetTypes, setSelectedPetTypes] = useState([...petTypes])

    const handleClick = (clickedPetType: PetType) => {
        let newPetTypes;
        if(selectedPetTypes.includes(clickedPetType)) {
            newPetTypes = selectedPetTypes.filter(d => d !== clickedPetType);
        }
        else {
            newPetTypes = [...selectedPetTypes, clickedPetType];
        }
        setSelectedPetTypes(newPetTypes);
        header.column.setFilterValue(newPetTypes);
    };
    return (
        <div
            key={header.id}
            className='flex h-full pb-1 justify-between'
        >
            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}
            <FloatingMenu
            achorContent={<FilterList fontSize="small"/>}
            >
                {
                    petTypes.map((petType) => (
                        <MenuItem
                            key={petType}
                            onClick={() => handleClick(petType)}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectedPetTypes.includes(petType)}
                                    />
                                }
                                label={petType}
                            />
                        </MenuItem>
                    ))
                }
            </FloatingMenu>
        </div>
    );
}