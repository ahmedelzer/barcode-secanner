import { GetProjectUrl, SetHeaders } from "../request";
import UseFetchWithoutBaseUrl from "./UseFetchWithoutBaseUrl";

const useFetch = (url, projectRoute) => {
  const realurl = `${GetProjectUrl(projectRoute)}${url}`;
  return UseFetchWithoutBaseUrl(realurl);
};
export const fetchData = async (url, projectRoute, options = {}) => {
  const headers = await SetHeaders();
  options = {
    method: "GET", // or 'POST', 'PUT', etc.
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };

  const realurl = `${GetProjectUrl(projectRoute)}${url}`;
  try {
    const response = await fetch(realurl, options);
    const result = await response.json();
    return { data: result, error: null, isLoading: false };
  } catch (error) {
    return { data: null, error: error, isLoading: false };
  }
};

export default useFetch;
