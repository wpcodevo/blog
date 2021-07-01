const fetcher = (url) => fetch(url).then((res) => res.json());

export const getBlogs = (url) => fetcher(url);
