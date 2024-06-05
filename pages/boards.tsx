import styles from "@/styles/boards.module.scss";
import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import { Article } from "@/types/board";
import BestArticleList from "@/components/board/BestArticle";
import ArticleList from "@/components/board/Article";
import SearchForm from "@/components/common/SearchForm";
import DropDown from "@/components/common/DropDown";
import Link from "next/link";

export default function Board() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [bestArticleList, setBestArticleList] = useState<Article[]>([]);
  const [order, setOrder] = useState("recent");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(1); // 현재 페이지
  const [pageSize, setPageSize] = useState(10); // 페이지 당 게시글 수
  const [bestPageSize, setBestPageSize] = useState(3); // 베스트 게시글 수(반응형 필요)
  const [totalPostCount, setTotalPostCount] = useState(0); // 총 게시글 수

  async function getArticleList() {
    const res = await axios.get(
      `/articles?page=${page}&pageSize=${pageSize}&orderBy=${order}&keyword=${keyword}`
    );
    const nextArticleList = res.data.list;
    const nextTotalCount = res.data.totalCount;
    setArticleList(nextArticleList);
    setTotalPostCount(nextTotalCount);
    console.log(nextArticleList);
  }

  async function getBestArticleList() {
    const res = await axios.get(
      `/articles?pageSize=${bestPageSize}&orderBy=like`
    );
    const nextArticleList = res.data.list;
    setBestArticleList(nextArticleList);
    console.log(nextArticleList);
  }

  useEffect(() => {
    getArticleList();
  }, [order, keyword, page, pageSize]);

  useEffect(() => {
    getBestArticleList();
  }, [bestPageSize]);

  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 768) {
        setBestPageSize(1);
      } else if (windowWidth <= 1200) {
        setBestPageSize(2);
      } else {
        setBestPageSize(3); // 기본값 3으로 설정
      }
    };

    handleWindowResize(); // 초기 사이즈 설정
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [bestPageSize]);

  return (
    <main className={styles.main}>
      <section className={styles["best-section"]}>
        <h2 className={styles.heading}>베스트 게시글</h2>
        <BestArticleList bestArticleList={bestArticleList} />
      </section>
      <section>
        <div className={styles["heading-button-container"]}>
          <h2 className={styles.heading}>게시글</h2>
          <Link href="/post" className={styles["post-button"]}>
            글쓰기
          </Link>
        </div>
        <div className={styles["search-menu-container"]}>
          <SearchForm keyword={keyword} onChangeKeyword={setKeyword} />
          <DropDown onOrderChange={setOrder} />
        </div>
        <ArticleList articleList={articleList} />
      </section>
    </main>
  );
}
