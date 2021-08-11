import { getPrivacy } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import GoogleAds from "components/GoogleAds";
import Aside from "components/Aside";
import FixGoogleAds from "components/FixGoogleAds";

const Privacy = ({ privacyData }) => {
  return (
    <>
      <PageSeo
        title='Privacy Policy'
        description='Privacy Policy At Codevo'
        url={`${content.siteUrl}/privacy`}
      />
      {/* Google Ads */}
      <FixGoogleAds />{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {privacyData.map((c, i) => {
              return (
                <div key={`${i}`}>
                  <div className='title'>
                    <h1>{c.title}</h1>
                  </div>
                  {/* <div style={{ margin: "1rem 0 1rem" }}>
                    <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
                  </div> */}
                  <FixGoogleAds />
                  {c.content && <BlogContent content={c.content} />}
                </div>
              );
            })}
            <FixGoogleAds />
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
