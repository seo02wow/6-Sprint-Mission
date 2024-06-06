import { Article } from "@/types/board";
import styles from "@/styles/BestArticle.module.scss";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

// NOTE - 베스트 게시글

interface BestArticleProps {
  article: Article;
}

function BestArticle({ article }: BestArticleProps) {
  return (
    <Link href={`addboard/${article.id}`}>
      <article className={styles["best-article-container"]}>
        <div className={styles["best-header-container"]}>
          <Image
            src="/assets/images/best.svg"
            width={12}
            height={14}
            alt="메달"
          />
          <p className={styles["best-header"]}>Best</p>
        </div>
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
        <div className={styles["writer-date-container"]}>
          <div className={styles["writer-heart-container"]}>
            <p className={styles.nickname}>{article.writer.nickname}</p>
            <div className={styles["heart-container"]}>
              <Image
                src="/assets/icons/heart.svg"
                width={16}
                height={16}
                alt="하트 아이콘"
              />
              <p className={styles["like-count"]}>{article.likeCount}</p>
            </div>
          </div>
          <p className={styles.date}>
            {moment(article.createdAt).format("YYYY.MM.DD")}
          </p>
        </div>
      </article>
    </Link>
  );
}

// NOTE - 베스트 게시글 리스트
interface BestArticleListProps {
  bestArticleList: Article[];
}

export default function BestArticleList({
  bestArticleList,
}: BestArticleListProps) {
  return (
    <div className={styles["best-article-list-container"]}>
      {bestArticleList.map((article) => {
        return <BestArticle key={article.id} article={article} />;
      })}
    </div>
  );
}
