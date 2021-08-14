import { Feed } from "feed";
const content = require("data/content");

const generateRSSFeed = async (blogs) => {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const {
    siteUrl,
    title,
    description,
    imageUrl,
    email,
    author: authorName,
    twitter,
  } = content;

  const date = new Date();
  const author = {
    name: authorName,
    email,
    link: twitter,
  };

  // Construct a new Feed object
  const feed = new Feed({
    title,
    description,
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: imageUrl,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Edem Ziddah`,
    updated: date,
    generator: "Next.js using Feed for Node.js",
    feedLinks: {
      rss2: `${siteUrl}/rss/rss.xml`,
      json: `${siteUrl}/rss/feed.json`,
      atom: `${siteUrl}/rss/atom.xml`,
    },
    author,
  });

  // Add each article to the feed
  blogs.forEach((blog) => {
    const url = `${siteUrl}/${blog.slug}`;

    feed.addItem({
      title: blog.title,
      id: url,
      link: url,
      description: blog.subtitle,
      content: blog.subtitle,
      author: [author],
      contributor: [author],
      date: new Date(blog.date),
    });
  });

  return feed;

  // Write the RSS output to a public file, making it
  // accessible at ashleemboyer.com/rss.xml
};

export default generateRSSFeed;
