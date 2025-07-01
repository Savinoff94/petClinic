
import {
    Header,
    // HeaderContext,
    flexRender
} from '@tanstack/react-table';
import Arrows from './Arrows/Arrows';
import { TextField } from '@mui/material';
  
export interface TableHeaderProps<TData extends object, TValue> {
    header: Header<TData, TValue>;
}

export function TableHeader<TData extends object, TValue>({
    header,
}: TableHeaderProps<TData, TValue>) {

    if(header.id === 'name' || header.id === 'petName') {
        return <TableHeaderSortableFilterText header={header}/>
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