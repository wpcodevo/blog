import Layout from "components/Layout";
import { getAbout } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import GoogleAds from "components/GoogleAds";

const About = ({ aboutData }) => {
  return (
    <>
      <NextSeo title='About Codevo' />
      {/* Google Ads */}
      {/* <div className='google-ads'>
        <GoogleAds slot='9967007599' layout='in-article' format='fluid' />
      </div> */}
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
