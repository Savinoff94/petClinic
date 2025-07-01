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
import { TableHeader } from "./TableHeader/TableHeader";

interface ITable {
  data: IPatient[]
}


function Table({data} : ITable) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
 
  const columns = useMemo<ColumnDef<IPatient>[]>(() => [
    {
      header: "Patient name",
      accessorKey: "name",
      sortingFn: 'text',
      filterFn: 'includesString',
    },
    {
      header: "Patient phone",
      accessorKey: "phone"
    },
    {
      header: "Pet name",
      accessorKey: "petName",
      sortingFn: 'text',
      filterFn: 'includesString',
    },
    {
      header: "Pet birth date",
      accessorKey: "petBirthDate",
      cell: (props) => {
        console.log(props);
        return <span>{yearsSince(props.getValue() as string)}</span>; 
      },
      filterFn: 'includesString',
    },
    {
      header: "Pet type",
      accessorKey: "petType",
    }
  ], [])

  const table = useReactTable({
    columns,
    data: data,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
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