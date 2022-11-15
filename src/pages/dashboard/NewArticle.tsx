import { usePostArticle } from "../../hooks/mutation/dashboard/usePostArticle";
import { useGetTagList } from "../../hooks/query/useGetTagList";
import ArticleAddEditForm from "../../sections/dashboard/ArticleAddEditForm";

const NewArticle = () => {
  const { data, isLoading } = useGetTagList();

  const { mutate, isLoading: isMutateLoading } = usePostArticle();

  return (
    <div className="p-3">
      <h1>New Article</h1>
      {isLoading ? (
        <>Loading</>
      ) : (
        <ArticleAddEditForm
          initialValues={{
            title: "",
            description: "",
            body: "",
            tagList: [],
          }}
          tagListData={data?.tags || []}
          onSubmit={(article) => {
            mutate({
              article,
            });
          }}
          buttonLoading={isMutateLoading}
        />
      )}
    </div>
  );
};
export default NewArticle;
