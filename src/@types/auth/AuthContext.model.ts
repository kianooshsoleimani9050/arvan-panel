import { Dispatch } from "react";
import { UserResponse } from "../models";

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  Initial = "INITIALIZE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Register = "REGISTER",
  Verifying = "VERIFYING",
}

export type AuthAuthPayload = {
  [Types.Initial]: {
    isAuthenticated: boolean;
    user: AuthUser;
  };
  [Types.Login]: {
    user: AuthUser;
  };
  [Types.Logout]: undefined;
  [Types.Register]: {
    user: AuthUser;
  };
};

export type AuthActions =
  ActionMap<AuthAuthPayload>[keyof ActionMap<AuthAuthPayload>];

export type AuthUser = UserResponse | null;

export type AuthState = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
};

export type LoginDispatchType = {
  user: UserResponse;
  token: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: AuthUser;
  login: (args: LoginDispatchType) => void;
  logout: () => void;
};
