import React from "react";
import useTable from "./useTable";

import TableSearch from "./TableSearch";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TablePagination from "./TablePagination";

const TableComponent = ({
  data = [],
  columns = [],
  loading = false,

  searchKeys = [],

  filters = {},

  actions,
  toolbar, // <-- Add this
  title,
  itemsPerPage = 5,

  className = "table table-bordered table-hover table-sm align-middle",

  emptyMessage = "No records found.",
}) => {
  const {
    search,
    setSearch,

    filterValues,
    setFilter,

    sortBy,
    sortOrder,
    setSort,

    currentPage,
    setCurrentPage,

    totalPages,

    paginatedData,
    resetTable,
  } = useTable({
    data,
    searchKeys,
    filters,
    itemsPerPage,
  });

  return (
    <>
      {/* Top Toolbar */}
      <div className="d-flex justify-content-between align-items-center mb-3 gap-3 flex-wrap">
        <span>{title}</span>
        <div className="col-auto d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-dark rounded-pill"
            onClick={resetTable}>
            ↻
          </button>
          <TableSearch
            value={search}
            onChange={setSearch}
            placeholder="Search..."
          />
          {toolbar}
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className={className}>
          <TableHeader
            columns={columns}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={setSort}
            filters={filters}
            onFilterChange={setFilter}
            showActions={!!actions}
          />

          <TableBody
            loading={loading}
            data={paginatedData}
            columns={columns}
            actions={actions}
            emptyMessage={emptyMessage}
          />

          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </table>
      </div>
    </>
  );
};

export default TableComponent;
