import { Spinner } from "react-bootstrap";
import { useSWRPages } from "swr";
import { useGetBlogs } from "actions";
import CardListItem from "components/CartListItem";
import CardsItemRow from "components/CardsItemRow";

const BlogList = ({ blogs, filter }) => {
  return filter.view.list ? (
    blogs.map((blog) => (
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
    <CardsItemRow paginatedBlogs={blogs} />
  );
};

const useGetBlogPages = ({ blogs, filter }) => {
  return useSWRPages(
    "index-page",
    ({ offset, withSWR }) => {
      const { data: paginatedBlogs, error } = withSWR(
        useGetBlogs({ offset, filter })
      );

      if (!offset && !paginatedBlogs && !error) {
        return <BlogList blogs={blogs} filter={filter} />;
      }

      if (!paginatedBlogs) {
        return (
          <div style={{ width: "100%", textAlign: "center", margin: "15px 0" }}>
            <Spinner animation='border' variant='danger' />
          </div>
        );
      }

      return <BlogList blogs={paginatedBlogs} filter={filter} />;
      // return blog list
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

export default useGetBlogPages;
