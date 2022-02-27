import { API_TOKEN, API_URL } from "../../environment";
import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${API_URL}/users/${login}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    const data = await response.json();

    dispatch({
      type: "GET_USER",
      payload: data,
    });
  };

  const getUserRepos = async (login) => {
    setLoading();
    const param = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(`${API_URL}/users/${login}/repos?${param}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    const data = await response.json();

    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
