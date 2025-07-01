
import {
    Header,
    // HeaderContext,
    flexRender
} from '@tanstack/react-table';
import Arrows from './Arrows/Arrows';
import { useState } from 'react';
  
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
            onClick={header.column.getToggleSortingHandler()}
            className='flex justify-center flex-col h-12'
        >   
            <div
                className='flex h-full justify-between items-center'
            >
                {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                )}
                <Arrows
                    direction={header.column.getIsSorted()}
                    header={header}
                />
            </div>
            
            {/* <input
                value={filterValue}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
            /> */}
        </div>
    );
}

function TableHeaderNonAction<TData extends object, TValue>({
    header,
    }: TableHeaderProps<TData, TValue>) {
    return (
        <div
            key={header.id}
        >
            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}
        </div>
    );
}