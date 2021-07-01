import Link from "next/link";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { urlFor } from "lib/api";
import getYouTubeID from "get-youtube-id";
const BlockContent = dynamic(() => import("@sanity/block-content-to-react"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spinner animation='border' variant='danger' />
    </div>
  ),
});

const HighLightCode = dynamic(() => import("components/HighLightCode"));
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
    table: ({ node }) => {
      return (
        <table className='table'>
          <thead>
            <tr>
              {node.rows[0].cells.map((cell, index) => (
                <th key={`${index}-list`} scope='col'>
                  {cell}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {node.rows.slice(1).map((row, index) => (
              <tr key={`${index}-lit`}>
                {row.cells.map((cell, index) => (
                  <td key={`${index}-lis`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      );
    },
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeID(url);
      return <YouTube className='youtubeWrapper lazyload' videoId={id} />;
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <img
          style={{ width: "100%" }}
          className={`block-img block-img-${position} lazyload`}
          src={urlFor(asset.url).width(550).height(370).url()}
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
          style={{ color: "#ff6200", textDecoration: "underline" }}
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
          <a
            aria-label='internal link'
            style={{ color: "#ff6200", textDecoration: "underline" }}
          >
            {children}
          </a>
        </Link>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return (
    <div className='blockContent'>
      <BlockContent serializers={serializers} blocks={content} />
    </div>
  );
};

export default BlogContent;
