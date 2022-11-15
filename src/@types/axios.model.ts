import { User, UserResponse } from "./models";

export type UserResponseEditedType = Omit<UserResponse, "user"> & {
  user: User & {
    token: string;
  };
};
