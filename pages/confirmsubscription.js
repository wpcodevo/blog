import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import Aside from "components/Aside";
import Image from "next/image";

const Subscription = () => {
  return (
    <>
      <PageSeo
        title='Email Confirmation'
        description='Confirm email to successfully subscribe to Codevo'
        url={`${content.siteUrl}/confirmsubscription`}
      />
      {/* Google Ads */}
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
                  width={550}
                  height={370}
                  layout='responsive'
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
                  width={550}
                  height={370}
                  className='img-move'
                  layout='responsive'
                  objectPosition=''
                />
              </div>
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
