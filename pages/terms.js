import { getTerms } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
import Aside from "components/Aside";

const Terms = ({ termsData }) => {
  return (
    <>
      <PageSeo
        title='Term of Use'
        description='Our Terms of Use'
        url={`${content.siteUrl}/terms`}
      />
      {/* Google Ads */}
      <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
        <AdSense.Google
          client='ca-pub-1057373061381635'
          slot='9967007599'
          style={{ display: "block", height: 200 }}
          format=''
          layout=''
        />
      </div>
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {termsData.map((c, i) => {
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

export default Terms;

export async function getStaticProps() {
  const termsContent = await getTerms();
  return {
    props: {
      termsData: termsContent,
    },
  };
}
