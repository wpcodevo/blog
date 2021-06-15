import Link from "next/link";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { urlFor } from "lib/api";
import getYouTubeId from "get-youtube-id";
import HighLightCode from "components/HighLightCode";
const BlockContent = dynamic(() => import("@sanity/block-content-to-react"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spinner animation='border' variant='danger' />
    </div>
  ),
});

const YouTube = dynamic(() => import("react-youtube"), {
  loading: () => (
    <div style={{ width: "100%", height: "45vh", background: "#222" }} />
  ),
});

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => {
      return (
        <HighLightCode language={language} code={code} filename={filename} />
      );
    },
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return <YouTube className='youtubeWrapper lazyload' videoId={id} />;
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <img
          style={{ width: "100%" }}
          className={`block-img block-img-${position} lazyload`}
          data-src={urlFor(asset.url).width(550).height(370).url()}
          alt={alt}
        />
      );
    },
  },
  marks: {
    color: ({ mark, children }) => {
      return <span style={{ color: mark.hex }}>{children}</span>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          href={href}
          style={{ color: "#ff6200" }}
          target='_blank'
          rel='noopener'
          aria-label='external link'
        >
          {children}
        </a>
      ) : (
        <a aria-label='external link' href={href} style={{ color: "#ff6200" }}>
          {children}
        </a>
      );
    },
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/blogs/${slug.current}`;
      return (
        <Link href={href}>
          <a aria-label='internal link' style={{ color: "#ff6200" }}>
            {children}
          </a>
        </Link>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return <BlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;
