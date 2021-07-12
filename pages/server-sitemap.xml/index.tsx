import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getBlogs, getCategories } from "lib/api";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const blogs = await getBlogs();
  const categories = await getCategories();

  const blogurls = blogs.map((blog) => ({
    loc: `https://www.wpcodevo.com/blogs/${blog.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const caturls = categories.map((category) => ({
    loc: `https://www.wpcodevo.com/categories/${category.slug}`,
    lastmod: new Date().toISOString(),
  }));

  const allurls = blogurls.concat(caturls);

  const fields: ISitemapField[] = allurls;

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Site() {}
