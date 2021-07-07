import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
import Aside from "components/Aside";
import { Image } from "react-bootstrap";

const Subscription = () => {
  return (
    <>
      <PageSeo
        title='Email Confirmation'
        description='Confirm email to successfully subscribe to Codevo'
        url={`${content.siteUrl}/confirmsubscription`}
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
      </div>{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            <div className='confirmSubscription'>
              <h1>Welcome to our Newsletter!</h1>
              <p>
                Before you can receive Free Updates and Exclusive Tips you need
                to confirm your email right now.
              </p>
              <p>(It's Simple)</p>
              <p>
                In 1-2 Minutes, you will receive an email, Just go to your
                inbox, open the email from Codevo Web, and click the link.
              </p>
              <div className='img-holder'>
                <Image
                  src='https://raw.githubusercontent.com/ziddahedem/blog/main/public/images/confirmTwo.png'
                  alt='confirm gmail for convertKit'
                  className='lazyload'
                />
              </div>
              <p>
                PS: If you don’t see a confirmation email, please check your
                <strong> spam/junk</strong> folder or{" "}
                <strong>promotion tab</strong>. Sometimes the confirmation
                message ends up there by mistake.
              </p>
              <div className='img-holder'>
                <Image
                  src='https://raw.githubusercontent.com/ziddahedem/blog/main/public/images/confirmOne.png'
                  alt='confirm gmail for convertKit'
                  className='img-move lazyload'
                />
              </div>
            </div>
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

export default Subscription;
