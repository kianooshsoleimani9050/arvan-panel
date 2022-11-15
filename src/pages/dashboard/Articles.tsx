import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomPagination } from "../../components/CustomPagination";
import { useGetArticles } from "../../hooks/query/useGetArticles";
import { ABSOLUTE_PATH, createPath } from "../../routes/paths";
import ArticlesTable from "../../sections/dashboard/ArticlesTable";
import DeleteArticleModal from "../../sections/dashboard/DeleteArticleModal";

const showDialogInitialValues = {
  show: false,
  articleSlug: "",
};

const Articles = () => {
  const navigate = useNavigate();
  const { page = "1" } = useParams();

  const { data, isLoading } = useGetArticles({ page });

  const [showDialog, setShowDialog] = useState(showDialogInitialValues);

  const handleCloseDeleteModal = () => {
    setShowDialog(showDialogInitialValues);
  };
  const handleOpenDeleteModal = (articleSlug: string) => {
    setShowDialog({
      show: true,
      articleSlug,
    });
  };

  const onNextClick = () => {
    navigate(
      createPath({
        path: ABSOLUTE_PATH.ARTICLE.PAGE,
        params: {
          page: Number(page) + 1,
        },
      }),
    );
  };
  const onPrevClick = () => {
    navigate(
      createPath({
        path: ABSOLUTE_PATH.ARTICLE.PAGE,
        params: {
          page: Number(page) - 1,
        },
      }),
    );
  };
  const onPageClick = (pageNumber: number) => {
    navigate(
      createPath({
        path: ABSOLUTE_PATH.ARTICLE.PAGE,
        params: {
          page: pageNumber,
        },
      }),
    );
  };

  return (
    <>
      <div className="p-3">
        <h1>All Posts</h1>
        <ArticlesTable
          data={data?.articles || []}
          loading={isLoading}
          onDeleteClick={handleOpenDeleteModal}
        />
        {!isLoading && (
          <div className="d-flex align-items-center justify-content-center">
            <CustomPagination
              totalPages={data?.totalPages || 1}
              activePage={Number(page)}
              onNextClick={onNextClick}
              onPrevClick={onPrevClick}
              onPageClick={onPageClick}
            />
          </div>
        )}
      </div>
      <DeleteArticleModal
        show={showDialog.show}
        articleSlug={showDialog.articleSlug}
        onHide={handleCloseDeleteModal}
      />
    </>
  );
};
export default Articles;
