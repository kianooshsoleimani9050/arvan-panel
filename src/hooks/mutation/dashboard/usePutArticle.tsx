import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ABSOLUTE_PATH } from "../../../routes/paths";
import panelAxios from "../../../utils/axios";
import { QUERY_KEYS } from "../../../utils/constance";

export const usePutArticle = () => {
  const queyClient = useQueryClient();

  const navigate = useNavigate();

  return useMutation(panelAxios.putArticle, {
    onSuccess: () => {
      queyClient.invalidateQueries([QUERY_KEYS.GET_ARTICLES], {
        refetchType: "all",
      });
      queyClient.invalidateQueries([QUERY_KEYS.GET_SINGLE_ARTICLE], {
        refetchType: "all",
      });
      navigate(ABSOLUTE_PATH.ARTICLE.BASE);
      toast(
        <>
          <b>Well done!</b> Article updated successfully
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
