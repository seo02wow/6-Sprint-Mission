import ArticleDetail from "@/components/board/ArticleDetail";
import axios from "@/lib/axios";
import { Article } from "@/types/board";
import { GetStaticPropsContext } from "next";
import styles from "@/styles/boardDetail.module.scss";
import CommentInput from "@/components/board/CommentInput";

export async function getStaticPaths() {
  const res = await axios.get("/articles");
  const articles = res.data.list;
  const paths = articles.map((article: Article) => ({
    params: { id: String(article.id) },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id: string = context.params?.id as string;
  const res = await axios.get(`/articles/${id}`);
  const article = res.data;
  return {
    props: {
      article,
    },
  };
}

interface BoardDetailProps {
  article: Article;
}

export default function BoardDetail({ article }: BoardDetailProps) {
  return (
    <main className={styles.main}>
      <ArticleDetail article={article} />
      <CommentInput />
    </main>
  );
}
