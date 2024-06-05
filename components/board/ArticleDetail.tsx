import { Article } from "@/types/board";

interface ArticleDetailProps {
  article: Article;
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  return (
    <section>
      <h1>{article.title}</h1>
    </section>
  );
}
