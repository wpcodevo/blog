import Head from "next/head";
import Link from "next/link";
import { DefaultSeo } from "next-seo";
import { SEO } from "components/MetaDecorator";

const offLine = () => (
  <>
    <Head>
      <DefaultSeo {...SEO} />;
    </Head>
    <h1>You are Offline</h1>
    <p>
      This page is not available. Here are some pages you have saved for offline
      use.
    </p>
    <ul>
      <li>
        <Link href='/'>
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href='/about'>
          <a>About</a>
        </Link>
      </li>
      <li>
        <Link href='/contact'>
          <a>Contact</a>
        </Link>
      </li>
    </ul>
  </>
);

export default offLine;
