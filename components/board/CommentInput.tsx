import styles from "@/styles/CommentInput.module.scss";

export default function CommentInput() {
  return (
    <section className={styles["comment-input-section"]}>
      <label htmlFor="comment" className={styles.label}>
        댓글 달기
      </label>
      <input
        type="text"
        id="comment"
        placeholder="댓글을 입력해주세요"
        className={styles["comment-input"]}
      />
      <button className={styles["comment-button"]}>등록</button>
    </section>
  );
}
