import styles from "@/styles/boards.module.scss";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Article } from "@/types/board";
import BestArticleList from "@/componets/board/BestArticle";
import ArticleList from "@/componets/board/Article";
import SearchForm from "@/componets/common/SearchForm";
import DropDown from "@/componets/common/DropDown";

export default function Board() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [bestArticleList, setBestArticleList] = useState<Article[]>([]);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지 당 게시글 수
  const [totalPostCount, setTotalPostCount] = useState(0); // 총 게시글 수

  async function getArticleList() {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=${order}`
    );
    const nextArticleList = res.data.list;
    const nextTotalCount = res.data.totalCount;
    setArticleList(nextArticleList);
    setTotalPostCount(nextTotalCount);
    console.log(nextArticleList);
  }

  async function getBestArticleList() {
    const res = await axios.get(`/articles?pageSize=3&orderBy=like`);
    const nextArticleList = res.data.list;
    setBestArticleList(nextArticleList);
    console.log(nextArticleList);
  }

  useEffect(() => {
    getArticleList();
    getBestArticleList();
  }, [order]);

  return (
    <main className={styles.main}>
      <section className={styles["best-section"]}>
        <h2 className={styles.heading}>베스트 게시글</h2>
        <BestArticleList bestArticleList={bestArticleList} />
      </section>
      <section>
        <h2 className={styles.heading}>게시글</h2>
        <div className={styles["search-menu-container"]}>
          <SearchForm />
          <DropDown onOrderChange={setOrder} />
        </div>
        <ArticleList articleList={articleList} />
      </section>
    </main>
  );
}
