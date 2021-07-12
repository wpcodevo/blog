const content = require("./data/content");

module.exports = {
  siteUrl: content.siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ["/500"],
  robotsTxtOptions: {
    policies: [{ userAgent: "*", allow: "/" }],
    additionalSitemaps: [
      `${content.siteUrl}/sitemap.xml`,
      `${content.siteUrl}/server-sitemap.xml`,
    ],
  },
};
