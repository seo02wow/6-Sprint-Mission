import { Comment } from "@/types/board";
import styles from "@/styles/Comments.module.scss";
import Image from "next/image";
import getTimeAgo from "@/utils/getTimeAgo";

interface CommentsProps {
  comments: Comment[];
}

export default function Comments({ comments }: CommentsProps) {
  return (
    <section className={styles["comments-section"]}>
      {comments.length === 0 ? (
        <div className={styles["none-comment-image"]}>
          <Image
            src="/assets/images/none-comment.svg"
            fill
            alt="댓글이 없어요"
          />
        </div>
      ) : (
        comments.map((comment) => (
          <div key={comment.id} className={styles["comment-container"]}>
            <div className={styles["content-button-container"]}>
              <p className={styles["comment-content"]}>{comment.content}</p>
              <input className={styles["plus-button"]} type="button" />
            </div>
            <div className={styles["profile-container"]}>
              <Image
                src="/assets/images/profile.svg"
                width={24}
                height={24}
                alt="프로필 기본 이미지"
              />
              <div className={styles["nickname-date-container"]}>
                <p className={styles.nickname}>{comment.writer.nickname}</p>
                <p className={styles.date}>{getTimeAgo(comment.createdAt)}</p>
              </div>
            </div>
          </div>
        ))
      )}
      <button className={styles["go-back-button"]}>
        목록으로 돌아가기
        <div className={styles["image-container"]}>
          <Image src="/assets/icons/back-button.svg" alt="돌아가기" fill />
        </div>
      </button>
    </section>
  );
}
