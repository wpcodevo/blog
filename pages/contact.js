import { getContact } from "lib/api";
import BlogContent from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
import Form from "components/Form";
const Aside = dynamic(() => import("components/Aside"));

const Contact = ({ contactData }) => {
  return (
    <>
      <PageSeo
        title={`Contact - ${content.author}`}
        description={`About me - ${content.description}`}
        url={`${content.siteUrl}/contact`}
      />
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {contactData.map((c, i) => {
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
