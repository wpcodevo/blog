import dynamic from "next/dynamic";
import { getTwoPopularBlogs, getTechBlogs, getDealsBlogs } from "lib/api";
import CardListItem from "components/CardListItem";
import NewsListItem from "components/NewsListItem";
import DealsListItem from "components/DealsListItem";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
const Aside = dynamic(() => import("components/Aside"));

function Home({ popularBlog, newsBlog, dealsBlog, preview }) {
  return (
    <>
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {preview && <PreviewAlert />}

            <span className='home-title'>Tutorials</span>
            {popularBlog.map((blog, index) => (
              <div key={`${index}-list`}>
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
            ))}

            <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
            </div>
            <div className='news-grid'>
              {newsBlog?.map((blog) => (
                <div key={`${newsBlog.length}-${Math.random()}-list`}>
                  <NewsListItem
                    coverImage={blog.coverImage}
                    subtitle={blog.subtitle}
                    link={{
                      href: "blogs/[slug]",
                      as: `blogs/${blog.slug}`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
            </div>
            <span style={{ margin: "25px 0 25px" }} className='home-title'>
              Deals & Coupons
            </span>
            <div className='deals'>
              {dealsBlog?.map((blog) => (
                <div key={`${dealsBlog.length}-${Math.random()}-list`}>
                  <DealsListItem
                    smallImage={blog.smallImage}
                    subtitle={blog.subtitle}
                    title={blog.title}
                    link={{
                      href: "blogs/[slug]",
                      as: `blogs/${blog.slug}`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div style={{ margin: ".5rem" }}>
              <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
            </div>
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
