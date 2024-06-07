import ArticleDetail from "@/components/board/ArticleDetail";
import axios from "@/lib/axios";
import { Article, Comment } from "@/types/board";
import { GetServerSidePropsContext } from "next";
import styles from "@/styles/boardDetail.module.scss";
import CommentInput from "@/components/board/CommentInput";
import Comments from "@/components/board/Comments";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.params?.id;
  const [articleRes, commentRes] = await Promise.all([
    axios.get(`/articles/${id}`),
    axios.get(`/articles/${id}/comments?limit=100`),
  ]);

  const article = articleRes.data;
  const comments = commentRes.data.list;

  return {
    props: {
      article,
      comments,
    },
  };
}

interface BoardDetailProps {
  article: Article;
  comments: Comment[];
}

export default function BoardDetail({ article, comments }: BoardDetailProps) {
  return (
    <main className={styles.main}>
      <ArticleDetail article={article} />
      <CommentInput />
      <Comments comments={comments} />
    </main>
  );
}
