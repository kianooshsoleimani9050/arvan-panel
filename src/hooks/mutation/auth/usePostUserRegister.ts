import { useMutation } from "@tanstack/react-query";
import panelAxios from "../../../utils/axios";
import useAuth from "../../useAuth";

export const usePostUserRegister = () => {
  const { login } = useAuth();
  return useMutation(panelAxios.postUserRegister, {
    onSuccess: ({ user: userData }) => {
      const { token, ...user } = userData;
      login({
        token,
        user: {
          user,
        },
      });
    },
  });
};
