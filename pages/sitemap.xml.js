import { getPaginatedBlogs, getCategories } from "lib/api";
const toUrl = (host, route) =>
  `<url>
  <loc>http://www.${host}${route}</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
  </url>`;

const createSitemap = (
  host,
  routes,
  blogs,
  categories
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map((route) => toUrl(host, route)).join("")}
    ${blogs.map((blog) => toUrl(host, `/blogs/${blog.slug}`)).join("")}
    ${categories.map((category) => toUrl(host, `/${category.slug}`)).join("")}
    </urlset>`;

const Sitemap = () => {};

Sitemap.getInitialProps = async ({ res, req }) => {
  const routes = [
    "",
    "/about",
    "/terms",
    "/categories",
    "/contact",
    "/confirmsubscription",
    "/blogs",
  ];
  const blogs = await getPaginatedBlogs();
  const categories = await getCategories();
  const sitemap = createSitemap(req.headers.host, routes, blogs, categories);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();
  return res;
};

export default Sitemap;
