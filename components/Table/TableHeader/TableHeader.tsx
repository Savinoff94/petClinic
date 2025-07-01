
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
        <th
            key={header.id}
            onClick={header.column.getToggleSortingHandler()}
        >
            <Arrows direction={header.column.getIsSorted()}/>
            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}
            <input
                value={filterValue}
                onChange={(e) => header.column.setFilterValue(e.target.value)}
            />
        </th>
    );
}

function TableHeaderNonAction<TData extends object, TValue>({
    header,
    }: TableHeaderProps<TData, TValue>) {
    return (
        <th
            key={header.id}
        >
            {flexRender(
                header.column.columnDef.header,
                header.getContext()
            )}
        </th>
    );
}