import { useQuery } from "@tanstack/react-query";
import { UseGetSingleArticle } from "../../@types/hooks/UseGetSingleArticle.model";
import panelAxios from "../../utils/axios";
import { QUERY_KEYS } from "../../utils/constance";

export const useGetSingleArticle = ({ slug }: UseGetSingleArticle) =>
  useQuery(
    [QUERY_KEYS.GET_SINGLE_ARTICLE, slug],
    () => panelAxios.getSingleArticle(slug),
    {
      enabled: !!slug,
    },
  );
