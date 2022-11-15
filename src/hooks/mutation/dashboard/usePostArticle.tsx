import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ABSOLUTE_PATH } from "../../../routes/paths";
import panelAxios from "../../../utils/axios";
import { QUERY_KEYS } from "../../../utils/constance";

export const usePostArticle = () => {
  const queyClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation(panelAxios.postArticle, {
    onSuccess: () => {
      queyClient.invalidateQueries([QUERY_KEYS.GET_ARTICLES], {
        refetchType: "all",
      });
      navigate(ABSOLUTE_PATH.ARTICLE.BASE);
      toast(
        <>
          <b>Well done!</b> Article created successfully
        </>,
        {
          type: "success",
          icon: false,
          hideProgressBar: true,
          closeButton: false,
        },
      );
    },
  });
};
