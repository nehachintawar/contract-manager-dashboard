import { fetchContracts } from "@/services/mockContractsApi";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  Filter,
  Loader2,
  Search,
  Settings2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router";
import { createColumns } from "./Columns";

const statusOptions = ["", "Active", "Expired", "Renewal Due"];
const riskOptions = ["", "Low", "Medium", "High"];

const ContractTable = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [risk, setRisk] = useState("");
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [columnVisibility, setColumnVisibility] = useState({});
  const [showColumnSettings, setShowColumnSettings] = useState(false);

  // Fetch contracts from mock API
  useEffect(() => {
    setLoading(true);
    setError("");
    const sortBy = sorting[0]?.id || "";
    const sortDir = sorting[0]?.desc ? "desc" : "asc";
    fetchContracts({
      page: pagination.pageIndex,
      pageSize: pagination.pageSize,
      search,
      status,
      risk,
      sortBy,
      sortDir,
    })
      .then((res) => {
        setData(res.data);
        setTotal(res.total);
      })
      .catch(() => setError("Failed to load contracts."))
      .finally(() => setLoading(false));
  }, [search, status, risk, sorting, pagination]);

  const columns = useMemo(() => createColumns(), []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
    manualPagination: true,
    pageCount: Math.ceil(total / pagination.pageSize),
    state: {
      sorting,
      pagination,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
  });

  // UI Handlers
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const handleRisk = (e) => {
    setRisk(e.target.value);
    setPagination((p) => ({ ...p, pageIndex: 0 }));
  };

  const goToFirstPage = () => setPagination((p) => ({ ...p, pageIndex: 0 }));
  const goToLastPage = () =>
    setPagination((p) => ({
      ...p,
      pageIndex: Math.ceil(total / p.pageSize) - 1,
    }));

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Contract Management
        </h2>
        <p className="text-gray-600">Manage and track all your contracts</p>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        {/* Search and Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={status}
              onChange={handleStatus}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {statusOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt ? opt : "All Statuses"}
                </option>
              ))}
            </select>
          </div>

          {/* Risk Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={risk}
              onChange={handleRisk}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
              {riskOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt ? opt : "All Risk Levels"}
                </option>
              ))}
            </select>
          </div>

          {/* Column Settings */}
          <div className="relative">
            <button
              onClick={() => setShowColumnSettings(!showColumnSettings)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <Settings2 className="w-4 h-4" />
              Columns
            </button>

            {showColumnSettings && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-3">
                <div className="space-y-2">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <label
                        key={column.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={column.getIsVisible()}
                          onChange={column.getToggleVisibilityHandler()}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">
                          {column.columnDef.header}
                        </span>
                      </label>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="text-sm text-gray-600">
          Showing {data.length} of {total} contracts
        </div>
      </div>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
            <span className="text-gray-600">Loading contracts...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-16 text-red-600">
            <AlertCircle className="w-6 h-6 mr-2" />
            <span>{error}</span>
          </div>
        ) : data.length === 0 ? (
          <div className="flex items-center justify-center py-16 text-gray-500">
            <span>No contracts found</span>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={`flex items-center gap-1 ${
                            header.column.getCanSort()
                              ? "cursor-pointer hover:text-gray-700"
                              : ""
                          }`}
                          onClick={header.column.getToggleSortingHandler?.()}
                        >
                          <span>{header.column.columnDef.header}</span>
                          {header.column.getCanSort() && (
                            <div className="flex flex-col">
                              {header.column.getIsSorted() === "asc" ? (
                                <ChevronUp className="w-4 h-4 text-blue-500" />
                              ) : header.column.getIsSorted() === "desc" ? (
                                <ChevronDown className="w-4 h-4 text-blue-500" />
                              ) : (
                                <div className="flex flex-col opacity-30">
                                  <ChevronUp className="w-3 h-3 -mb-1" />
                                  <ChevronDown className="w-3 h-3" />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`hover:bg-gray-50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                    >
                      <NavLink to={`/contracts/${cell.row.original.id}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </NavLink>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Enhanced Pagination */}
      {!loading && !error && data.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {pagination.pageIndex * pagination.pageSize + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(
                (pagination.pageIndex + 1) * pagination.pageSize,
                total
              )}
            </span>{" "}
            of <span className="font-medium">{total}</span> results
          </div>

          <div className="flex items-center gap-2">
            {/* Page Size Selector */}
            <select
              value={pagination.pageSize}
              onChange={(e) =>
                setPagination((p) => ({
                  ...p,
                  pageSize: Number(e.target.value),
                  pageIndex: 0,
                }))
              }
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size} per page
                </option>
              ))}
            </select>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={goToFirstPage}
                disabled={pagination.pageIndex === 0}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="First page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  setPagination((p) => ({
                    ...p,
                    pageIndex: Math.max(0, p.pageIndex - 1),
                  }))
                }
                disabled={pagination.pageIndex === 0}
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 py-2 text-sm text-gray-700">
                Page {pagination.pageIndex + 1} of{" "}
                {Math.max(1, Math.ceil(total / pagination.pageSize))}
              </span>

              <button
                onClick={() =>
                  setPagination((p) => ({
                    ...p,
                    pageIndex: Math.min(
                      Math.ceil(total / p.pageSize) - 1,
                      p.pageIndex + 1
                    ),
                  }))
                }
                disabled={
                  pagination.pageIndex >=
                  Math.ceil(total / pagination.pageSize) - 1
                }
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={goToLastPage}
                disabled={
                  pagination.pageIndex >=
                  Math.ceil(total / pagination.pageSize) - 1
                }
                className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Last page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside to close column settings */}
      {showColumnSettings && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowColumnSettings(false)}
        />
      )}
    </div>
  );
};

export default ContractTable;
