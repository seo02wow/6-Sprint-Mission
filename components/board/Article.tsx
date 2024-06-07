import { Article } from "@/types/board";
import styles from "@/styles/Article.module.scss";
import Image from "next/image";
import Link from "next/link";
import { getDate } from "@/utils/getDate";
import { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import SearchForm from "../common/SearchForm";
import DropDown from "../common/DropDown";
import axios from "@/lib/axios";

interface ArticleProps {
  article: Article;
}

function ArticleCard({ article }: ArticleProps) {
  return (
    <Link href={`addboard/${article.id}`}>
      <article className={styles["article-container"]}>
        <div className={styles["title-img-container"]}>
          <h2 className={styles.title}>{article.title}</h2>
          {article.image && (
            <div className={styles["image-wrapper"]}>
              <Image
                src={article.image}
                width={48}
                height={44}
                alt="게시글 이미지"
              />
            </div>
          )}
        </div>
        <div className={styles["writer-like-container"]}>
          <div className={styles["writer-date-container"]}>
            <Image
              src="assets/images/profile.svg"
              width={24}
              height={24}
              alt="프로필 기본 이미지"
            />
            <p className={styles.nickname}>{article.writer.nickname}</p>
            <p className={styles.date}>{getDate(article.createdAt)}</p>
          </div>
          <div className={styles["heart-container"]}>
            <Image
              src="/assets/icons/heart.svg"
              width={24}
              height={24}
              alt="하트 아이콘"
            />
            <p className={styles["like-count"]}>{article.likeCount}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default function ArticleList() {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [order, setOrder] = useState("recent");
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
          <Link href="/post" className={styles["post-button"]}>
            글쓰기
          </Link>
        </div>
        <div className={styles["search-menu-container"]}>
          <SearchForm keyword={keyword} onChangeKeyword={setKeyword} />
          <DropDown onOrderChange={setOrder} />
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
