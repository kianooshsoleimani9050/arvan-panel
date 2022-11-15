import { format } from "date-fns";
import { memo } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomTableRowType } from "../../@types/components/CustomTable.model";
import { Article } from "../../@types/models";
import { ArticlesTablePropsType } from "../../@types/sections/ArticleTable.model";
import { CustomTable } from "../../components/CustomTable";
import { ABSOLUTE_PATH, createPath } from "../../routes/paths";
import { wordsSelector } from "../../utils/common";

const ArticlesTable = ({
  data,
  loading,
  onDeleteClick,
}: ArticlesTablePropsType) => (
  <CustomTable
    loading={loading}
    columns={[
      {
        key: "title",
        header: "Title",
        renderer: (row: CustomTableRowType<Article>) => (
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: 200 }}
          >
            {row.title}
          </span>
        ),
      },
      {
        key: "author",
        header: "Author",
      },
      {
        key: "tagList",
        header: "Tags",
        renderer: (row: CustomTableRowType<Article>) => (
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: 200 }}
          >
            {row.tagList.map((tag) => `${tag},`)}
          </span>
        ),
      },
      {
        key: "body",
        header: "Excerpt",
        renderer: (row: CustomTableRowType<Article>) => (
          <span
            className="d-inline-block text-truncate"
            style={{ maxWidth: 200 }}
          >
            {wordsSelector(row.body, 20)}
          </span>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        renderer: (row: CustomTableRowType<Article>) =>
          format(new Date(row.createdAt), "MMM dd ,yyyy"),
      },
      {
        key: "options",
        header: "",
        renderer: (row: CustomTableRowType<Article>) => (
          <DropdownButton title="..." variant="info">
            <Dropdown.Item
              as={Link}
              to={createPath({
                path: ABSOLUTE_PATH.ARTICLE.EDIT,
                params: {
                  slug: row.slug,
                },
              })}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                onDeleteClick(row.slug);
              }}
            >
              Delete
            </Dropdown.Item>
          </DropdownButton>
        ),
      },
    ]}
    rows={data.map((article) => ({
      ...article,
      id: article.slug,
      author: article.author.username,
    }))}
  />
);
export default memo(ArticlesTable);
