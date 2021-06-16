import { Image } from "react-bootstrap";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className='error404'>
      <div className='errorImage'>
        <Image src='/images/404.svg' height='100%' />
      </div>
      <div className='content'>
        <p>The Page You are looking for is now beyound our Reach...</p>
        <Link href='/'>
          <a aria-label='back to home'>Go Home</a>
        </Link>
      </div>
    </div>
  );
}
