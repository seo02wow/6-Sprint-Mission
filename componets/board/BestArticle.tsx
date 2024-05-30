import { Article } from "@/types/board";
import styles from "@/styles/BestArticle.module.scss";
import moment from "moment";

// NOTE - 베스트 게시글

interface BestArticleProps {
  article: Article;
}

function BestArticle({ article }: BestArticleProps) {
  return (
    <article className={styles["best-article-container"]}>
      <h2 className={styles.title}>{article.title}</h2>
      <p>{article.writer.nickname}</p>
      <p>{article.likeCount}</p>
      <p>{moment(article.createdAt).format("YYYY.MM.DD")}</p>
    </article>
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
