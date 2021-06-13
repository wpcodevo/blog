const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
import { getPaginatedBlogs } from "lib/api";

export default async (req, res) => {
  try {
    // An array with your links
    const blogs = await getPaginatedBlogs();
    const links = blogs?.map((b) => {
      return { url: `/blog/${b.slug}/`, changefreq: "daily", priority: 0.3 };
    });

    // Create a stream to write to
    const stream = new SitemapStream({
      hostname: `https://${req.headers.host}`,
    });

    res.writeHead(200, {
      "Content-Type": "application/xml",
    });

    const xmlString = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    res.end(xmlString);
  } catch (error) {
    res.send(JSON.stringify(error));
  }
};
