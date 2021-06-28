import { getPrivacy } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const Aside = dynamic(() => import("components/Aside"));

const Privacy = ({ privacyData }) => {
  return (
    <>
      <NextSeo title='Privacy at Codevo' />
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {privacyData.map((c, i) => {
              return (
                <div key={`${i}`}>
                  <div className='title'>
                    <h1>{c.title}</h1>
                  </div>
                  <div style={{ margin: "1rem 0 1rem" }}>
                    <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
                  </div>
                  {c.content && <BlogContent content={c.content} />}
                </div>
              );
            })}
            <div style={{ margin: "1rem 0 1rem" }}>
              <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
            </div>
          </main>
        </div>
        {/* Aside */}
        <Aside />
      </div>
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
