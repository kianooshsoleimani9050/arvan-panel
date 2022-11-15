import { NewArticle } from "../models";

export type ArticleAddEditFormPropsType = {
  isEditMode?: boolean;
  initialValues: NewArticle;
  tagListData: string[];
  buttonLoading: boolean;
  onSubmit: (data: NewArticle) => void;
};
