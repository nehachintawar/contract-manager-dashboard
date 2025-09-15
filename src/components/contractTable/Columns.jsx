import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper();

export const createColumns = () => [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  columnHelper.accessor("parties", {
    header: "Parties",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  columnHelper.accessor("expiry", {
    header: "Expiry Date",
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("risk", {
    header: "Risk Score",
    cell: (info) => info.getValue(),
    size: 100,
  }),
];
