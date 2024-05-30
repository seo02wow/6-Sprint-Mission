import { Article } from "@/types/board";
import styles from "@/styles/Article.module.scss";
import moment from "moment";
import Image from "next/image";

interface ArticleProps {
  article: Article;
}

function MainArticle({ article }: ArticleProps) {
  return (
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
          <p className={styles.date}>
            {moment(article.createdAt).format("YYYY.MM.DD")}
          </p>
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
  );
}

interface ArticleListProps {
  articleList: Article[];
}

export default function ArticleList({ articleList }: ArticleListProps) {
  return (
    <div className={styles["article-list-container"]}>
      {articleList.map((article) => {
        return <MainArticle key={article.id} article={article} />;
      })}
      <></>
    </div>
  );
}
