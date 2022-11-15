import panelAxios from "./axios";

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    panelAxios.axiosInstance.defaults.headers.common.Authorization = `Token ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete panelAxios.axiosInstance.defaults.headers.common.Authorization;
  }
};

export { setSession };
