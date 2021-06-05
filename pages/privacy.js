import Layout from "components/Layout";
import { getPrivacy } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";

const Privacy = ({ privacyData }) => {
  return (
    <>
      <NextSeo title='Privacy at Codevo' />
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
        {privacyData.map((c, i) => {
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

export default Privacy;

export async function getStaticProps() {
  const privacyContent = await getPrivacy();
  return {
    props: {
      privacyData: privacyContent,
    },
  };
}