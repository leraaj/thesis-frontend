import React from "react";

const TableBody = ({
  loading = false,
  data = [],
  columns = [],
  actions,
  emptyMessage = "No records found.",
  onRowClick,
}) => {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (actions ? 1 : 0)}
            className="text-center py-4">
            <div className="spinner-border spinner-border-sm me-2" />
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }

  if (!data.length) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length + (actions ? 1 : 0)}
            className="text-center py-4">
            {emptyMessage}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {data.map((row, index) => (
        <tr
          key={row._id ?? row.id ?? index}
          onClick={() => onRowClick?.(row)}
          style={{
            cursor: onRowClick ? "pointer" : "default",
          }}>
          {columns.map((column) => (
            <td key={column.key}>
              {column.render ? column.render(row) : row[column.key] ?? "-"}
            </td>
          ))}

          {actions && (
            <td className="text-center">
              {typeof actions === "function" ? actions(row) : actions}
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
