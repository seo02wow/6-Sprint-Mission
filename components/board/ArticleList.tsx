import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import SearchForm from "../common/SearchForm";
import DropDown from "../common/DropDown";
import axios from "@/lib/axios";
import { Order } from "@/types/order";
import styles from "@/styles/Article.module.scss";
import { Article } from "@/types/board";
import Link from "next/link";
import ArticleCard from "./Article";

export default function ArticleList() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [order, setOrder] = useState<Order>(Order.Recent);
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지 당 게시글 수
  const [totalPostCount, setTotalPostCount] = useState(0); // 총 게시글 수

  async function getArticleList() {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${keyword}`
    );
    const nextArticleList = res.data.list;
    const nextTotalCount = res.data.totalCount;
    setArticleList(nextArticleList);
    setTotalPostCount(nextTotalCount);
  }

  useEffect(() => {
    getArticleList();
  }, [order, keyword, page, pageSize]);

  return (
    <>
      <section>
        <div className={styles["heading-button-container"]}>
          <h2 className={styles.heading}>게시글</h2>
          <Link href="/addboard" className={styles["post-button"]}>
            글쓰기
          </Link>
        </div>
        <div className={styles["search-menu-container"]}>
          <SearchForm keyword={keyword} onChangeKeyword={setKeyword} />
          <DropDown selectedOption={order} setSelectedOption={setOrder} />
        </div>
        <div className={styles["article-list-container"]}>
          {articleList.map((article) => {
            return <ArticleCard key={article.id} article={article} />;
          })}
        </div>
      </section>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPage={Math.ceil(totalPostCount / pageSize)}
      />
    </>
  );
}
