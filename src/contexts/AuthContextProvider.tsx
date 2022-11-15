import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
// utils
import panelAxios from "../utils/axios";
import { setSession } from "../utils/auth";
// @types
import {
  AuthState,
  AuthContextType,
  AuthActions,
  Types,
  LoginDispatchType,
} from "../@types/auth/AuthContext.model";

const initialState: AuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const AuthReducer = (state: AuthState, action: AuthActions): AuthState => {
  switch (action.type) {
    case Types.Initial:
      return {
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user,
      };

    case Types.Login:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };

    case Types.Logout:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };

    case Types.Register:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
  }
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => {},
  logout: () => {},
});

type AuthContextProviderProps = {
  children: ReactNode;
};

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          setSession(accessToken);
          const user = await panelAxios.getCurrentUser();

          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: Types.Initial,
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        dispatch({
          type: Types.Initial,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = useCallback(({ user, token }: LoginDispatchType) => {
    setSession(token);
    dispatch({
      type: Types.Login,
      payload: {
        user,
      },
    });
  }, []);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: Types.Logout });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
