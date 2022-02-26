import { API_TOKEN, API_URL } from "../../environment";
import { createContext, useReducer } from "react";

import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({
      q: text,
    });
    const response = await fetch(`${API_URL}/search/users?${params}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    const { items } = await response.json();

    console.log({ items });

    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  return <GithubContext.Provider value={{ users: state.users, loading: state.loading, searchUsers }}>{children}</GithubContext.Provider>;
};

export default GithubContext;
