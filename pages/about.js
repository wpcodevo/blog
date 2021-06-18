import Layout from "components/Layout";
import { getAbout } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

const About = ({ aboutData }) => {
  return (
    <>
      <NextSeo title='About Codevo' />
      {/* Google Ads */}
      <div className='google-ads'>
        <GoogleAds
          format='auto'
          responsive='true'
          layoutKey={process.env.LAYOUTkEY}
          slot={process.env.HORIZONTAL_SLOT}
        />
      </div>
      <Layout>
        {aboutData.map((c, i) => {
          return (
            <div key={`${i}`}>
              <div className='title'>
                <h1>{c.title}</h1>
              </div>
              {c.content && <BlogContent content={c.content} />}
            </div>
          );
        })}
      </Layout>
    </>
  );
};

export default About;

export async function getStaticProps() {
  const aboutContent = await getAbout();
  return {
    props: {
      aboutData: aboutContent,
    },
  };
}
