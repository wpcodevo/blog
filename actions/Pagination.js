import { Spinner } from "react-bootstrap";
import { useEffect } from "react";
import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import CardListItem from "components/CartListItem";
import CardsItemRow from "components/CardsItemRow";

export const useGetBlogPages = ({ blogs, filter }) => {
  useEffect(() => {
    window.__pagination__init = true;
  }, []);

  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      let initialData = !offset && blogs;

      if (typeof window !== "undefined" && window.__pagination__init) {
        initialData = null;
      }

      const { data: paginatedBlogs } = withSWR(
        useGetBlogs({ offset, filter }, initialData)
      );

      if (!paginatedBlogs) {
        return (
          <div style={{ width: "100%", textAlign: "center" }}>
            <Spinner animation='border' variant='danger' />
          </div>
        );
      }

      return filter.view.list ? (
        paginatedBlogs.map((blog) => (
          <div key={`${blogs.length}-${Math.random()}-list`}>
            <CardListItem
              title={blog.title}
              coverImage={blog.coverImage}
              subtitle={blog.subtitle}
              date={blog.date}
              author={blog.author}
              link={{
                href: "blogs/[slug]",
                as: `blogs/${blog.slug}`,
              }}
            />
          </div>
        ))
      ) : (
        <CardsItemRow paginatedBlogs={paginatedBlogs} />
      );
    },

    (SWR, index) => {
      if (SWR.data && SWR.data.length === 0) {
        return null;
      }
      return (index + 1) * 6;
    },
    [filter]
  );
};
