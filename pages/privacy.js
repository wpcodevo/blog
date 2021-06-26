import Layout from "components/Layout";
import { getPrivacy } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

const Privacy = ({ privacyData }) => {
  return (
    <>
      <NextSeo title='Privacy at Codevo' />
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>{" "}
      <Layout>
        {privacyData.map((c, i) => {
          return (
            <div key={`${i}`}>
              <div className='title'>
                <h1>{c.title}</h1>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
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
