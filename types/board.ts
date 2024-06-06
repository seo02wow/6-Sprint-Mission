import Writer from "./writer";

export interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: Writer;
  image?: string;
  content: string;
  title: string;
  id: number;
}

export default interface ArticleList {
  totalCount: number;
  list: Article[];
}
