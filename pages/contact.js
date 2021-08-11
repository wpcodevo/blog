import { getContact } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import GoogleAds from "components/GoogleAds";
import Form from "components/Form";
import Aside from "components/Aside";
import FixGoogleAds from "components/FixGoogleAds";

const Contact = ({ contactData }) => {
  return (
    <>
      <PageSeo
        title={`Contact - ${content.author}`}
        description={`About me - ${content.description}`}
        url={`${content.siteUrl}/contact`}
      />
      {/* Google Ads */}
      <FixGoogleAds />{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {contactData.map((c, i) => {
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
            <Form />
          </main>
        </div>
        {/* Aside */}
        <Aside />
      </div>
    </>
  );
};

export default Contact;

export async function getStaticProps() {
  const contactContent = await getContact();
  return {
    props: {
      contactData: contactContent,
    },
  };
}
