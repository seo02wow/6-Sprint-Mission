import { useEffect, useState } from "react";
import "../styles/Pagination.css";
function Pagination({ currentPage, totalPage, onPageChange }) {
  const [pageList, setPageList] = useState([]);

  const createPageList = (totalPage) => {
    return Array.from({ length: totalPage }, (v, i) => i + 1);
  };

  useEffect(() => {
    if (totalPage === 1) return null;
    setPageList(createPageList(totalPage));
  }, [totalPage]);

  const handleNextPage = () => {
    onPageChange((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    onPageChange((prevPage) => prevPage - 1);
  };

  const handleChangePage = (page) => {
    onPageChange(page);
  };

  return (
    <div className="pagination">
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`page-btn next-prev-btn ${
          currentPage === 1 ? " disabled-prev" : " active-prev"
        }`}
      ></button>
      {pageList.map((page) => (
        <button
          key={page}
          onClick={() => handleChangePage(page)}
          className={`page-btn ${currentPage === page ? " active" : ""}`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === pageList.length}
        className={`page-btn next-prev-btn ${
          currentPage === pageList.length ? " disabled-next" : " active-next"
        }`}
      ></button>
    </div>
  );
}

export default Pagination;
