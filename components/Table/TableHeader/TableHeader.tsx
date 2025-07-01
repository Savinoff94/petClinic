
import {
    Header,
    // HeaderContext,
    flexRender
} from '@tanstack/react-table';
import Arrows from './Arrows/Arrows';
  
export interface TableHeaderProps<TData extends object, TValue> {
    header: Header<TData, TValue>;
}


export function TableHeaderSortable<TData extends object, TValue>({
    header,
    }: TableHeaderProps<TData, TValue>) {
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
        </th>
    );
}