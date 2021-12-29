import { getContact } from "lib/api";
import { BlogContent } from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import Form from "components/Form";
import Aside from "components/Aside";

const Contact = ({ contactData }) => {
  return (
    <>
      <PageSeo
        title={`Contact - ${content.author}`}
        description={`About me - ${content.description}`}
        url={`${content.siteUrl}/contact`}
      />
      {/* Google Ads */}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
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
