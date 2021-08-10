import { getAbout } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
import Aside from "components/Aside";

const About = ({ aboutData }) => {
  return (
    <>
      <PageSeo
        title={`About - ${content.author}`}
        description={`About me - ${content.description}`}
        url={`${content.siteUrl}/about`}
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
      </div>
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {aboutData.map((c, i) => {
              return (
                <div key={`${i}`}>
                  <div className='title'>
                    <h1>About</h1>
                  </div>
                  <div style={{ margin: "1rem 0 1rem" }}>
                    <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
                  </div>
                  {c.bio && <BlogContent content={c.bio} />}
                </div>
              );
            })}
            <div className='widget' style={{ maxHeight: "60rem !important" }}>
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

export default About;

export async function getStaticProps() {
  const aboutContent = await getAbout();
  return {
    props: {
      aboutData: aboutContent,
    },
  };
}
