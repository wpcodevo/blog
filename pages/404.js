import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className='error404'>
      <div className='errorImage'>
        <Image
          style={{ width: "100%", height: "100%" }}
          src='/images/404.svg'
          height='400'
          width='400'
        />
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
