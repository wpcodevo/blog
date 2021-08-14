import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, []);

  return (
    <div className='error404'>
      <div className='errorImage'>
        <Image
          className='errorimg'
          src='/images/404.svg'
          height='400'
          width='400'
          alt='404 image'
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
