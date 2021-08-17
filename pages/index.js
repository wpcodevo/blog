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

  await generateRSSFeed();

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
