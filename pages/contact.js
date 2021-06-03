import Layout from "components/Layout";
import { getContact } from "lib/api";
import BlogContent from "components/BlogContent";

const Contact = ({ contactData }) => {
  return (
    <>
      {/* Google Ads */}
      <div className='google-ads'>
        {/* <AdSense.Google
            client='ca-pub-1057373061381635'
            slot='9967007599'
            style={{ display: "block" }}
            layout='in-article'
            format='fluid'
          /> */}
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
