import { useSWRInfinite } from "swr";
import { getBlogs } from "actions";

export const useGetBlogsPages = ({ category, filter }) => {
  const result = useSWRInfinite((index, previousPageData) => {
    if (index === 0) {
      return `/api/blogs?date=${
        filter.date.asc ? "asc" : "desc"
      }&category=${category}`;
    }

    if (!previousPageData.length) {
      return null;
    }

    return `/api/blogs?offset=${index * 6}&date=${
      filter.date.asc ? "asc" : "desc"
    }&category=${category}`;
  }, getBlogs);

  let hitEnd = false;
  const { data } = result;

  if (data) {
    hitEnd = data[data.length - 1].length === 0;
  }

  return { ...result, hitEnd };
};

export const useGetBlogs = ({ filter }) => {
  const result = useSWRInfinite((index, previousPageData) => {
    if (index === 0) {
      return `/api/allblogs?date=${filter.date.asc ? "asc" : "desc"}`;
    }

    if (!previousPageData.length) {
      return null;
    }

    return `/api/allblogs?offset=${index * 10}&date=${
      filter.date.asc ? "asc" : "desc"
    }`;
  }, getBlogs);

  let hitEnd = false;
  const { data } = result;

  if (data) {
    hitEnd = data[data.length - 1].length === 0;
  }

  return { ...result, hitEnd };
};

export const useGetSearchBlogs = ({ filter, query }) => {
  const result = useSWRInfinite((index, previousPageData) => {
    if (index === 0) {
      return `/api/search?date=${filter.date.asc ? "asc" : "desc"}&q=${query}`;
    }

    if (!previousPageData.length) {
      return null;
    }

    return `/api/search?offset=${index * 10}&date=${
      filter.date.asc ? "asc" : "desc"
    }&q=${query}`;
  }, getBlogs);

  let hitEnd = false;
  const { data } = result;

  if (data) {
    hitEnd = data[data.length - 1].length === 0;
  }

  return { ...result, hitEnd };
};
