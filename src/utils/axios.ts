import axios from "axios";
import { UserResponseEditedType } from "../@types/axios.model";
import {
  LoginUserRequest,
  MultipleArticlesResponse,
  NewArticleRequest,
  NewUserRequest,
  SingleArticleResponse,
  TagsResponse,
  UserResponse,
} from "../@types/models";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_URI,
});

const panelAxios = {
  axiosInstance,
  // User and Authentication
  postUserLogin: (data: LoginUserRequest) =>
    axiosInstance
      .post<UserResponseEditedType>("users/login", data)
      .then((res) => res.data),
  postUserRegister: (data: NewUserRequest) =>
    axiosInstance
      .post<UserResponseEditedType>("users", data)
      .then((res) => res.data),
  getCurrentUser: () =>
    axiosInstance.get<UserResponse>("user").then((res) => res.data),

  // Articles
  getArticles: (page: number) =>
    axiosInstance
      .get<MultipleArticlesResponse>("articles", {
        params: {
          offset: (page - 1) * 20,
        },
      })
      .then((res) => res.data),
  getSingleArticle: (slug: string) =>
    axiosInstance
      .get<SingleArticleResponse>(`articles/${slug}`)
      .then((res) => res.data),
  postArticle: (data: NewArticleRequest) =>
    axiosInstance
      .post<SingleArticleResponse>("articles", data)
      .then((res) => res.data),
  putArticle: ({ data, slug }: { data: NewArticleRequest; slug: string }) =>
    axiosInstance
      .put<SingleArticleResponse>(`articles/${slug}`, data)
      .then((res) => res.data),
  deleteArticle: (slug: string) =>
    axiosInstance.delete(`articles/${slug}`).then((res) => res.data),

  // Default
  getTags: () =>
    axiosInstance.get<TagsResponse>("tags").then((res) => res.data),
};
export default panelAxios;
