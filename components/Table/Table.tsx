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
  getPaginationRowModel
} from "@tanstack/react-table";
import { yearsSince } from "@/lib/helpers";
import { TableHeader } from "./TableHeader/TableHeader";
import { memo } from "react";

import Paper from '@mui/material/Paper';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button } from "@mui/material";

interface ITable {
  data: IPatientDashboardInfo[],
  actionClickHandle: (id:string) => void
}


function Table({data, actionClickHandle} : ITable) {

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 8,
  });
 
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
      pagination
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <Paper className="font-mono w-full overflow-hidden">
      <TableContainer className="max-h-[440px] md:max-h-[640px]">
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
      <div className="w-full flex justify-center items-center">
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
      </div>
    </Paper>
  );
}

export default memo(Table);