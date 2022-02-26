import { API_TOKEN, API_URL } from "../../environment";
import { createContext, useState } from "react";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return <GithubContext.Provider value={{ users, loading, fetchUsers }}>{children}</GithubContext.Provider>;
};

export default GithubContext;
