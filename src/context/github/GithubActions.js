import { API_TOKEN, API_URL } from "../../environment";

import axios from "axios";

const github = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });
  const response = await github.get(`/search/users?${params}`);

  if (response.status === 404) {
    window.location = "/notfound";
    return null;
  } else {
    return response.data.items;
  }
};

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos`)]);

  return { user: user.data, repos: repos.data };
};
