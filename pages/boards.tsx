import styles from "@/styles/boards.module.scss";
import BestArticleList from "@/components/board/BestArticle";
import ArticleList from "@/components/board/Article";

export default function Board() {
  return (
    <main className={styles.main}>
      <section className={styles["best-section"]}>
        <h2 className={styles.heading}>베스트 게시글</h2>
        <BestArticleList />
      </section>
      <ArticleList />
    </main>
  );
}
