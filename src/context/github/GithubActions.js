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

export const getUser = async (login) => {
  const response = await fetch(`${API_URL}/users/${login}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
  const data = await response.json();
  return data;
};

export const getUserRepos = async (login) => {
  const param = new URLSearchParams({
    sort: "created",
    per_page: 10,
  });
  const response = await fetch(`${API_URL}/users/${login}/repos?${param}`, { headers: { Authorization: `Bearer ${API_TOKEN}` } });
  const data = await response.json();
  return data;
};
