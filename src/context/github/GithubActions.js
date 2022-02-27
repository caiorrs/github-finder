import { API_TOKEN, API_URL } from "../../environment";

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await fetch(`${API_URL}/search/users?${params}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });

  if (response.status === 404) {
    window.location = "/notfound";
    return null;
  } else {
    const { items } = await response.json();

    return items;
  }
};
