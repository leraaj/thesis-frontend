import React from "react";

const TableHeader = ({
  columns,
  sortBy,
  sortOrder,
  onSort,
  filterValues = {},
  onFilterChange,
  showActions = true,
}) => {
  const handleSort = (key, order) => {
    onSort(key, order);
  };

  const handleFilter = (key, value) => {
    onFilterChange(key, value);
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.key}>
            <div className="d-flex align-items-center justify-content-between gap-2">
              <span>{column.label}</span>

              {/* Filter */}
              {column.filter?.length > 0 && (
                <select
                  className="form-select form-select-sm"
                  value={filterValues[column.key] ?? ""}
                  onChange={(e) => onFilterChange(column.key, e.target.value)}>
                  <option value="">All</option>

                  {column.filter.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {/* Only show sort buttons if there's no filter */}
              {!column.filter?.length && column.sortable && (
                <div className="btn-group btn-group-sm">
                  <button
                    className={`btn ${
                      sortBy === column.key && sortOrder === "asc"
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => onSort(column.key, "asc")}>
                    ↑
                  </button>

                  <button
                    className={`btn ${
                      sortBy === column.key && sortOrder === "desc"
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() => onSort(column.key, "desc")}>
                    ↓
                  </button>
                </div>
              )}
            </div>
          </th>
        ))}

        {showActions && (
          <th className="text-center" style={{ width: 150 }}>
            Actions
          </th>
        )}
      </tr>
    </thead>
  );
};

export default TableHeader;
