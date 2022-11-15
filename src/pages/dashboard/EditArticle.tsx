import { useParams } from "react-router-dom";
import { usePutArticle } from "../../hooks/mutation/dashboard/usePutArticle";
import { useGetSingleArticle } from "../../hooks/query/useGetSingleArticle";
import { useGetTagList } from "../../hooks/query/useGetTagList";
import ArticleAddEditForm from "../../sections/dashboard/ArticleAddEditForm";

const EditArticle = () => {
  const { slug = "" } = useParams();

  const { data: articleData, isLoading: isArticleLoading } =
    useGetSingleArticle({ slug });

  const { data: tagsData, isLoading: isTagsLoading } = useGetTagList();

  const { mutate, isLoading: isMutateLoading } = usePutArticle();

  const tagListData = [
    ...(tagsData?.tags || []),
    ...(articleData?.article.tagList || []),
  ].filter((tag, index, array) => array.indexOf(tag) === index);

  return (
    <div className="p-3">
      <h1>Edit Article</h1>
      {isArticleLoading || isTagsLoading ? (
        <>Loading</>
      ) : (
        <ArticleAddEditForm
          isEditMode
          initialValues={{
            title: articleData?.article.title || "",
            description: articleData?.article.description || "",
            body: articleData?.article.body || "",
            tagList: articleData?.article.tagList || [],
          }}
          tagListData={tagListData}
          onSubmit={(article) => {
            mutate({
              data: {
                article,
              },
              slug,
            });
          }}
          buttonLoading={isMutateLoading}
        />
      )}
    </div>
  );
};
export default EditArticle;
