import { useQuery } from "@tanstack/react-query";
import { UseGetArticlesType } from "../../@types/hooks/UseGetArticles.model";
import panelAxios from "../../utils/axios";
import { QUERY_KEYS } from "../../utils/constance";

export const useGetTagList = () =>
  useQuery([QUERY_KEYS.GET_TAG_LIST], () => panelAxios.getTags());
