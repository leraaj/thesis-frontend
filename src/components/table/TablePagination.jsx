import React from "react";

const TablePagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <tfoot>
      <tr>
        <td colSpan="100%">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Page {currentPage} of {totalPages}
            </small>

            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li
                  className={`page-item ${
                    currentPage === 1 ? "disabled" : ""
                  }`}>
                  <button className="page-link" onClick={() => changePage(1)}>
                    First
                  </button>
                </li>

                <li
                  className={`page-item ${
                    currentPage === 1 ? "disabled" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage - 1)}>
                    Previous
                  </button>
                </li>

                {getPages().map((page, index) =>
                  page === "..." ? (
                    <li
                      key={`ellipsis-${index}`}
                      className="page-item disabled">
                      <span className="page-link">…</span>
                    </li>
                  ) : (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}>
                      <button
                        className="page-link"
                        onClick={() => changePage(page)}>
                        {page}
                      </button>
                    </li>
                  )
                )}

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => changePage(currentPage + 1)}>
                    Next
                  </button>
                </li>

                <li
                  className={`page-item ${
                    currentPage === totalPages ? "disabled" : ""
                  }`}>
                  <button
                    className="page-link"
                    onClick={() => changePage(totalPages)}>
                    Last
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </td>
      </tr>
    </tfoot>
  );
};

export default TablePagination;
