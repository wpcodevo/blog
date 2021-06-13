import Layout from "components/Layout";
import { getContact } from "lib/api";
import BlogContent from "components/BlogContent";
import { NextSeo } from "next-seo";
import GoogleAds from "components/GoogleAds";

const Contact = ({ contactData }) => {
  return (
    <>
      <NextSeo title='Contact Codevo' />
      {/* Google Ads */}
      <div className='google-ads'>
        <GoogleAds slot='9967007599' layout='in-article' format='fluid' />
      </div>
      <Layout>
        {contactData.map((c, i) => {
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

export default Contact;

export async function getStaticProps() {
  const contactContent = await getContact();
  return {
    props: {
      contactData: contactContent,
    },
  };
}
