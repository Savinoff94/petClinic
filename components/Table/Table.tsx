import { IPatientDashboardInfo } from "@/lib/interfaces";
import { ActionCell } from "./ActionCell/ActionCell";
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

import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import TableRow from '@mui/material/TableRow';

interface ITable {
  data: IPatientDashboardInfo[],
  actionClickHandle: (id:string) => void
}


function Table({data, actionClickHandle} : ITable) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
 
  const columns = useMemo<ColumnDef<IPatientDashboardInfo>[]>(() => [
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
      header: "Pet age",
      accessorKey: "petBirthDate",
      cell: (props) => {
        return <span>{yearsSince(props.getValue() as string)}</span>; 
      },
    },
    {
      header: "Pet type",
      accessorKey: "petType",
      filterFn: (row, columnId, filterValue: string[]) => {

        const cellValue = String(row.getValue(columnId));
        return filterValue.includes(cellValue);
      },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => {
        const patient = row.original;
        return <ActionCell onClickHandle={() => actionClickHandle(patient.id)}/>;
      },
    }
  ], [actionClickHandle])

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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
      <MuiTable stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {table.getHeaderGroups().map(headerGroup => (
                  headerGroup.headers.map(header => (
                    <TableCell
                      className={header.id === 'name' || header.id === 'petName' ? '' : 'pt-0'}
                      key={header.id}
                    >
                      <TableHeader
                        header={header}
                        key={header.id}
                      />
                    </TableCell>
                  ))
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map(row => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </Paper>
  );
}

export default Table;