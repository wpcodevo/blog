import dynamic from "next/dynamic";
import {
  getTwoPopularBlogs,
  getTechBlogs,
  getDealsBlogs,
  getBlogs,
} from "lib/api";
import CardListItem from "components/CardListItem";
import NewsListItem from "components/NewsListItem";
import DealsListItem from "components/DealsListItem";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import GoogleAds from "components/GoogleAds";
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
import Aside from "components/Aside";
import FixGoogleAds from "components/FixGoogleAds";
import generateRSSFeed from "scripts/rss";
const fs = require("fs");

function Home({ popularBlog, newsBlog, dealsBlog, preview }) {
  return (
    <>
      <PageSeo
        title={`${content.title}`}
        description={`${content.description}`}
        url={`${content.siteUrl}`}
      />
      {/* Google Ads */}
      <FixGoogleAds />
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {preview && <PreviewAlert />}

            <span className='home-title'>Tutorials</span>
            {popularBlog.map((blog, index) => (
              <div key={`${index}-list`}>
                <CardListItem
                  title={blog.title}
                  smallImage={blog.smallImage}
                  subtitle={blog.subtitle}
                  date={blog.date}
                  author={blog.author}
                  link={{
                    href: "blogs/[slug]",
                    as: `blogs/${blog.slug}`,
                  }}
                />
              </div>
            ))}

            {/* <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
            </div> */}
            <div className='news-grid'>
              {newsBlog?.map((blog) => (
                <div key={`${newsBlog.length}-${Math.random()}-list`}>
                  <NewsListItem
                    smallImage={blog.smallImage}
                    shorttitle={blog.shorttitle}
                    link={{
                      href: "blogs/[slug]",
                      as: `blogs/${blog.slug}`,
                    }}
                  />
                </div>
              ))}
            </div>
            {/* <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
            </div> */}
            <span
              style={{ margin: "25px 0 25px", display: "inline-block" }}
              className='home-title'
            >
              Deals & Coupons
            </span>
            <div className='deals'>
              {dealsBlog?.map((blog) => (
                <div key={`${dealsBlog.length}-${Math.random()}-list`}>
                  <DealsListItem
                    smallImage={blog.smallImage}
                    shorttitle={blog.shorttitle}
                    title={blog.title}
                    link={{
                      href: "blogs/[slug]",
                      as: `blogs/${blog.slug}`,
                    }}
                  />
                </div>
              ))}
            </div>
            {/* <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
            </div> */}
          </main>
        </div>
        {/* Aside */}
        <Aside />
      </div>
    </>
  );
}

export default Home;

export async function getStaticProps({ preview = false }) {
  const popularBlog = await getTwoPopularBlogs();
  const newsBlog = await getTechBlogs();
  const dealsBlog = await getDealsBlogs();

  const blogs = await getBlogs();

  const feed = await generateRSSFeed(blogs);

  if (process.env.NODE_ENV === "production") {
    fs.mkdirSync("./public/rss", { recursive: true });
    fs.writeFileSync("./public/rss/feed.xml", feed.rss2());
    fs.writeFileSync("./public/rss/atom.xml", feed.atom1());
    fs.writeFileSync("./public/rss/feed.json", feed.json1());
  }
  return {
    props: {
      popularBlog,
      newsBlog,
      dealsBlog,
      preview,
    },
    revalidate: 1,
  };
}
