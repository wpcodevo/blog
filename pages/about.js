import Layout from "components/Layout";
import { getAbout } from "lib/api";
import BlogContent from "components/BlogContent";

const About = ({ aboutData }) => {
  return (
    <>
      {/* Google Ads */}
      <div className='google-ads'>
        {/* <AdSense.Google
            client='ca-pub-1057373061381635'
            slot='9967007599'
            style={{ display: "block" }}
            layout='in-article'
            format='fluid'
          /> */}
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
