import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const Aside = dynamic(() => import("components/Aside"));
import { Image } from "react-bootstrap";

const Subscription = () => {
  return (
    <>
      <NextSeo title='Email Confirmation' />
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>{" "}
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            <div>
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
              <div
                className='img-holder'
                style={{
                  width: "800px",
                  height: "399px",
                }}
              >
                <Image
                  src='https://raw.githubusercontent.com/ziddahedem/blog/main/public/images/confirmTwo.png'
                  alt='confirm gmail for convertKit'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <p>
                PS: If you don’t see a confirmation email, please check your
                spam/junk folder or promotion tab. Sometimes the confirmation
                message ends up there by mistake.
              </p>
              <div
                className='img-holder'
                style={{
                  width: "800px",
                  height: "399px",
                }}
              >
                <Image
                  src='https://raw.githubusercontent.com/ziddahedem/blog/main/public/images/confirmOne.png'
                  alt='confirm gmail for convertKit'
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
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
