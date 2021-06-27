import dynamic from "next/dynamic";
import { getOnePopularBlogs, getNewsBlogs, getDealsBlogs } from "lib/api";
import Layout from "components/Layout";
import CardListItem from "components/CardListItem";
import NewsListItem from "components/NewsListItem";
import DealsListItem from "components/DealsListItem";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

function Home({ singlePopularBlog, newsBlog, dealsBlog }) {
  return (
    <>
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>
      <Layout>
        <h3 className='home-title'>Tutorials</h3>
        <CardListItem
          title={singlePopularBlog.title}
          coverImage={singlePopularBlog.coverImage}
          subtitle={singlePopularBlog.subtitle}
          date={singlePopularBlog.date}
          author={singlePopularBlog.author}
          link={{
            href: "blogs/[slug]",
            as: `blogs/${singlePopularBlog.slug}`,
          }}
        />
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
        <h3 style={{ margin: "25px 0 25px" }} className='home-title'>
          Deals & Coupons
        </h3>
        <div className='deals'>
          {dealsBlog?.map((blog) => (
            <div key={`${dealsBlog.length}-${Math.random()}-list`}>
              <DealsListItem
                coverImage={blog.coverImage}
                subtitle={blog.subtitle}
                title='FancyThemes Coupon'
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
      </Layout>
    </>
  );
}

export default Home;

export async function getStaticProps() {
  const singlePopularBlog = await getOnePopularBlogs();
  const newsBlog = await getNewsBlogs();
  const dealsBlog = await getDealsBlogs();
  return {
    props: {
      singlePopularBlog,
      newsBlog,
      dealsBlog,
    },
    revalidate: 1,
  };
}
