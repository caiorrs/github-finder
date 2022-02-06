import { API_TOKEN, API_URL } from "../../environment";
import { useEffect, useState } from "react";

import Spinner from "../layout/Spinner";

const UserResults = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch(`${API_URL}/users`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
    const data = await response.json();

    setUsers(data);
    setLoading(false);
  };

  return loading ? (
    <Spinner />
  ) : (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
      {users.map((user) => (
        <h3 key={user.login}>{user.login}</h3>
      ))}
    </div>
  );
};

export default UserResults;
