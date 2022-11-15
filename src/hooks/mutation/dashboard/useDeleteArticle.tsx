import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UseDeleteArticleType } from "../../../@types/hooks/UseDeleteArticle.model";
import panelAxios from "../../../utils/axios";
import { QUERY_KEYS } from "../../../utils/constance";

export const useDeleteArticle = (options?: UseDeleteArticleType) => {
  const queyClient = useQueryClient();
  return useMutation(panelAxios.deleteArticle, {
    onSuccess: () => {
      queyClient.invalidateQueries([QUERY_KEYS.GET_ARTICLES], {
        refetchType: "all",
      });
      toast("Article deleted successfully", {
        type: "success",
        icon: false,
        hideProgressBar: true,
        closeButton: false,
      });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};
