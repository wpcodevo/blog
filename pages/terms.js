import Layout from "components/Layout";
import { getTerms } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import AdSense from "react-adsense";

const Terms = ({ termsData }) => {
  return (
    <>
      <NextSeo title='Terms of Use' />
      {/* Google Ads */}
      <div className='google-ads'>
        <AdSense.Google
          client='ca-pub-1057373061381635'
          slot='9967007599'
          style={{ display: "block" }}
          layout='in-article'
          format='fluid'
        />
      </div>
      <Layout>
        {termsData.map((c, i) => {
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

export default Terms;

export async function getStaticProps() {
  const termsContent = await getTerms();
  return {
    props: {
      termsData: termsContent,
    },
  };
}
