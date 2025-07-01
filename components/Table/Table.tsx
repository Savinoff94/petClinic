import { IPatient } from "@/lib/interfaces";
import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { yearsSince } from "@/lib/helpers";
import { TableHeaderSortable } from "./TableHeader/TableHeader";

interface ITable {
  data: IPatient[]
}


function Table({data} : ITable) {

  const [sorting, setSorting] = useState<SortingState>([]);
 
  const columns = useMemo<ColumnDef<IPatient>[]>(() => [
    {
      header: "Patient name",
      accessorKey: "name",
      sortingFn: 'alphanumeric'
    },
    {
      header: "Patient phone",
      accessorKey: "phone"
    },
    {
      header: "Pet name",
      accessorKey: "petName"
    },
    {
      header: "Pet birth date",
      accessorKey: "petBirthDate",
      cell: (props) => {
        console.log(props);
        return <span>{yearsSince(props.getValue() as string)}</span>; 
      },
    }
  ], [])

  const table = useReactTable({
    columns,
    data: data,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              // <th
              // key={header.id}
              // onClick={header.column.getToggleSortingHandler()}
              // >
              //   {console.log('id:', header.id)}
              //   {flexRender(
              //     header.column.columnDef.header,
              //     header.getContext()
              //   )}
              // </th>
              <TableHeader
                header={header}
                key={header.id}
              />
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;