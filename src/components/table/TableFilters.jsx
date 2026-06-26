import React from "react";

const TableFilters = ({ filters = {}, filterValues = {}, onChange }) => {
  if (Object.keys(filters).length === 0) return null;

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      {Object.entries(filters).map(([key, options]) => (
        <div key={key} className="col-auto">
          <select
            className="form-select form-select-sm"
            value={filterValues[key] ?? ""}
            onChange={(e) => onChange(key, e.target.value)}>
            <option value="">All {key}</option>

            {options.map((option) => (
              <option key={option} value={option}>
                {String(option).charAt(0).toUpperCase() +
                  String(option).slice(1)}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
};

export default TableFilters;
