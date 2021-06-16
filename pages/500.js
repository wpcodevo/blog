import { Image } from "react-bootstrap";
import Link from "next/link";

export default function Custom500() {
  return (
    <div className='error404'>
      <div className='errorImage'>
        <Image src='/images/500.svg' height='100%' />
      </div>
      <div className='content'>
        <h3>Oops, something went wrong</h3>
        <p>
          Server error 500. We apologise and are fixing the problem. Try again
          at a later time.
        </p>
        <Link href='/'>
          <a aria-label='back to home'>Bact to Home</a>
        </Link>
      </div>
    </div>
  );
}
