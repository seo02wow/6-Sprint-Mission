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

export interface Comment {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentList {
  nextCursor?: number;
  list: Comment[];
}
