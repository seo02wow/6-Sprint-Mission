import { useEffect, useState } from "react";
import styles from "@/styles/Pagination.module.scss";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (pageNumber: number) => void;
}

export default function Pagination({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) {
  const [pageList, setPageList] = useState<number[]>([]);

  const createPageList = (totalPage: number): number[] => {
    return Array.from({ length: totalPage }, (v, i) => i + 1);
  };

  useEffect(() => {
    if (totalPage === 1) return () => {};
    setPageList(createPageList(totalPage));
  }, [totalPage]);

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleChangePage = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className={`${styles["page-btn"]} ${styles["next-prev-btn"]} ${
          currentPage === 1 ? styles["disabled-prev"] : styles["active-prev"]
        }`}
      ></button>
      {pageList.map((page) => (
        <button
          key={page}
          onClick={() => handleChangePage(page)}
          className={`${styles["page-btn"]} ${
            currentPage === page ? styles["active"] : ""
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNextPage}
        disabled={currentPage === pageList.length}
        className={`${styles["page-btn"]} ${styles["next-prev-btn"]} ${
          currentPage === pageList.length
            ? styles["disabled-next"]
            : styles["active-next"]
        }`}
      ></button>
    </div>
  );
}
