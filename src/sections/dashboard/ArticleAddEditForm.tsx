import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import * as Yup from "yup";
import { ArticleAddEditFormPropsType } from "../../@types/sections/ArticleAddEditForm.model";
import { InputListener } from "../../components/InputListener";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  body: Yup.string().required(),
  tagList: Yup.array().of(Yup.string()).nullable(),
});

const ArticleAddEditForm = ({
  isEditMode = false,
  initialValues,
  tagListData,
  buttonLoading,
  onSubmit,
}: ArticleAddEditFormPropsType) => {
  const [tags, setTags] = useState(tagListData);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (data) => {
      onSubmit(data);
    },
  });

  useEffect(() => {
    if (!!tagListData.length) {
      setTags(tagListData);
    }
  }, [tagListData]);

  const handleOnEnterKeydownNewTag = useCallback((value: string) => {
    setTags((prev) => {
      const isValueExist = prev.indexOf(value) !== -1;
      if (!isValueExist) {
        return [...prev, value];
      }
      return prev;
    });
    formik.setValues((prev) => {
      const isValueExist = prev.tagList?.indexOf(value) !== -1;
      if (!isValueExist) {
        return {
          ...prev,
          tagList: [...(prev.tagList || []), value],
        };
      }
      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleError = !!formik.errors.title && !!formik.touched.title;
  const descriptionError =
    !!formik.errors.description && !!formik.touched.description;
  const bodyError = !!formik.errors.body && !!formik.touched.body;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Row>
        <Col sm={6} lg={9}>
          <Stack>
            <Form.Group className="mb-4">
              <Form.Label className={titleError ? "text-danger" : ""}>
                Title
              </Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={titleError ? "border-danger" : ""}
              />
              {titleError && (
                <Form.Text className="text-danger">
                  {formik.errors.title}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className={descriptionError ? "text-danger" : ""}>
                Description
              </Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="Description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={descriptionError ? "border-danger" : ""}
              />
              {descriptionError && (
                <Form.Text className="text-danger">
                  {formik.errors.description}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className={bodyError ? "text-danger" : ""}>
                Body
              </Form.Label>
              <Form.Control
                name="body"
                as="textarea"
                rows={6}
                value={formik.values.body}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={bodyError ? "border-danger" : ""}
              />
              {bodyError && (
                <Form.Text className="text-danger">
                  {formik.errors.body}
                </Form.Text>
              )}
            </Form.Group>
          </Stack>
        </Col>
        <Col sm={6} lg={3}>
          <Form.Group className="mb-4 px-md-2">
            <Form.Label>Tags</Form.Label>
            {!isEditMode && (
              <InputListener
                type="text"
                placeholder="New Tag"
                onEnterKeydown={handleOnEnterKeydownNewTag}
              />
            )}
            <div
              className={`${
                !tags.length ? "d-none" : ""
              } mt-4 p-3 border rounded article-tag-list-container`}
            >
              {tags?.map((tag) => (
                <Form.Check
                  key={tag}
                  label={tag}
                  disabled={isEditMode}
                  checked={formik.values.tagList?.indexOf(tag) !== -1}
                  onChange={(e) => {
                    if (!isEditMode) {
                      const value = e.target.checked;
                      let newTagList: string[];
                      if (value) {
                        newTagList = [...(formik.values.tagList || []), tag];
                      } else {
                        newTagList =
                          formik.values.tagList?.filter(
                            (formikTag) => formikTag !== tag,
                          ) || [];
                      }
                      formik.setFieldValue("tagList", newTagList);
                    }
                  }}
                />
              ))}
            </div>
          </Form.Group>
        </Col>
        <Col>
          <Button type="submit" variant="primary" disabled={buttonLoading}>
            {buttonLoading ? "Loading..." : "Submit"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
export default ArticleAddEditForm;
