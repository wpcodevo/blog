import { getPrivacy } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
import Aside from "components/Aside";

const Privacy = ({ privacyData }) => {
  return (
    <>
      <PageSeo
        title='Privacy Policy'
        description='Privacy Policy At Codevo'
        url={`${content.siteUrl}/privacy`}
      />
      {/* Google Ads */}
      <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
        <AdSense.Google
          client={process.env.NEXT_PUBLIC_DATA_AD_CLIENT}
          slot={process.env.NEXT_PUBLIC_DISPLAY_ADS}
          style={{ display: "block", height: 200 }}
          format=''
          layout=''
        />
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
                    <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
                  </div>
                  {c.content && <BlogContent content={c.content} />}
                </div>
              );
            })}
            <div style={{ margin: "1rem 0 1rem" }}>
              <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
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
