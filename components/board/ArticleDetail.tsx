import { Article } from "@/types/board";
import Image from "next/image";
import styles from "@/styles/ArticleDetail.module.scss";
import moment from "moment";

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <section>
      <div className={styles["title-plus-container"]}>
        <h1 className={styles.title}>{article.title}</h1>
        <Image
          src="/assets/icons/plus-button.svg"
          width={24}
          height={24}
          alt="프로필 기본 이미지"
        />
      </div>
      <div className={styles["profile-heart-container"]}>
        <div className={styles["profile-date-container"]}>
          <Image
            src="/assets/images/profile.svg"
            width={24}
            height={24}
            alt="프로필 기본 이미지"
          />
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>
            {moment(article.createdAt).format("YYYY.MM.DD")}
          </p>
        </div>
        <div className={styles["heart-count-container"]}>
          <Image
            src="/assets/icons/heart.svg"
            width={24}
            height={24}
            alt="하트 아이콘"
          />
          <p className={styles["like-count"]}>{article.likeCount}</p>
        </div>
      </div>
      <div className={styles["content-container"]}>
        <p className={styles.content}>{article.content}</p>
        {article.image && (
          <Image
            src={article.image}
            alt="게시글 사진"
            width={150}
            height={150}
          />
        )}
      </div>
    </section>
  );
}
