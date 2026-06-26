import { useEffect, useMemo, useState } from "react";

const useTable = ({ data = [], searchKeys = [], itemsPerPage = 5 }) => {
  // Search
  const [search, setSearch] = useState("");

  // Sorting
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Filters
  const [filterValues, setFilterValues] = useState({});

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * Update one filter
   */
  const setFilter = (key, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * Update sorting
   */
  const setSort = (key, order) => {
    setSortBy(key);
    setSortOrder(order);
  };

  /**
   * Reset table
   */
  const resetTable = () => {
    setSearch("");
    setSortBy(null);
    setSortOrder("asc");
    setFilterValues({});
    setCurrentPage(1);
  };

  /**
   * Return to page 1 whenever search/filter/sort changes
   */
  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterValues, sortBy, sortOrder]);

  /**
   * Search + Filter + Sort
   */
  const processedData = useMemo(() => {
    let result = [...data];

    // SEARCH
    if (search.trim()) {
      const keyword = search.toLowerCase();

      result = result.filter((item) =>
        searchKeys.some((key) =>
          String(item[key] ?? "")
            .toLowerCase()
            .includes(keyword)
        )
      );
    }

    // FILTERS
    Object.entries(filterValues).forEach(([key, value]) => {
      if (!value) return;

      result = result.filter((item) => String(item[key]) === String(value));
    });

    // SORT
    if (sortBy) {
      result.sort((a, b) => {
        let first = a[sortBy];
        let second = b[sortBy];

        first = String(first ?? "").toLowerCase();
        second = String(second ?? "").toLowerCase();

        if (first < second) return sortOrder === "asc" ? -1 : 1;
        if (first > second) return sortOrder === "asc" ? 1 : -1;

        return 0;
      });
    }

    return result;
  }, [data, search, searchKeys, filterValues, sortBy, sortOrder]);

  /**
   * Pagination
   */
  const totalPages = Math.max(
    1,
    Math.ceil(processedData.length / itemsPerPage)
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return processedData.slice(start, start + itemsPerPage);
  }, [processedData, currentPage, itemsPerPage]);

  /**
   * Prevent page overflow
   */
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    // Search
    search,
    setSearch,

    // Filters
    filterValues,
    setFilter,

    // Sorting
    sortBy,
    sortOrder,
    setSort,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,

    // Original filtered/sorted data
    processedData,

    // Helpers
    resetTable,
  };
};

export default useTable;
