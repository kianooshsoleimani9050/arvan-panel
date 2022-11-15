import { Button, Modal } from "react-bootstrap";
import { DeleteArticleModalPropsType } from "../../@types/sections/DeleteArticleModal.model";
import { useDeleteArticle } from "../../hooks/mutation/dashboard/useDeleteArticle";

const DeleteArticleModal = ({
  show,
  onHide,
  articleSlug,
}: DeleteArticleModalPropsType) => {
  const { mutate, isLoading } = useDeleteArticle({
    onSuccess: () => {
      onHide();
    },
  });

  const handleClickYes = () => {
    mutate(articleSlug);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Article</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Are you sure to delete Article?</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-dark" onClick={onHide}>
          No
        </Button>
        <Button variant="danger" disabled={isLoading} onClick={handleClickYes}>
          {isLoading ? "Loading..." : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default DeleteArticleModal;
