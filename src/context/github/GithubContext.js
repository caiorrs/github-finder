import { API_TOKEN, API_URL } from "../../environment";
import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS" });
  };

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${API_URL}/search/users?${params}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });

    if (response.status === 404) {
      window.location = "/notfound";
      dispatch({
        type: "GET_USERS",
        payload: null,
      });
    } else {
      const { items } = await response.json();

      dispatch({
        type: "GET_USERS",
        payload: items,
      });
    }
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

  return (
    <GithubContext.Provider value={{ users: state.users, user: state.user, loading: state.loading, searchUsers, clearUsers, getUser }}>
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
