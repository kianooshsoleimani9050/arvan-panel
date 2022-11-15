import { useQuery } from "@tanstack/react-query";
import { UseGetArticlesType } from "../../@types/hooks/UseGetArticles.model";
import panelAxios from "../../utils/axios";
import { QUERY_KEYS } from "../../utils/constance";

export const useGetArticles = ({ page }: UseGetArticlesType) =>
  useQuery(
    [QUERY_KEYS.GET_ARTICLES, page],
    () => panelAxios.getArticles(Number(page)),
    {
      select: (data) => ({
        ...data,
        totalPages: Math.floor(data.articlesCount / 20),
      }),
      enabled: !!page,
    },
  );
