import { getAbout } from "lib/api";
import { BlogContent } from "components/BlogContent";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
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
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            {aboutData.map((c, i) => {
              return (
                <div key={`${i}`}>
                  <div className='title'>
                    <h1>About</h1>
                  </div>

                  {c.bio && <BlogContent content={c.bio} />}
                </div>
              );
            })}
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
