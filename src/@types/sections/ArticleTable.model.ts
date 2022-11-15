import { Article } from "../models";

export type ArticlesTablePropsType = {
  data: Article[];
  loading: boolean;
  onDeleteClick: (articleSlug: string) => void;
};
