import { Article } from "@/types/board";

interface ArticleProps {
  article: Article;
}

function MainArticle({ article }: ArticleProps) {
  return (
    <article>
      <h2>{article.title}</h2>
    </article>
  );
}

interface ArticleListProps {
  articleList: Article[];
}

export default function ArticleList({ articleList }: ArticleListProps) {
  return (
    <div>
      {articleList.map((article) => {
        return <MainArticle key={article.id} article={article} />;
      })}
      <></>
    </div>
  );
}
