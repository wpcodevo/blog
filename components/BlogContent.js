import Link from "next/link";
import { urlFor } from "lib/api";
import getYouTubeID from "get-youtube-id";
import BlockContent from "@sanity/block-content-to-react";
import HighLightCode from "components/HighLightCode";
import YouTube from "react-youtube";
import GoogleAds from "components/GoogleAds";

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
      return (
        <div style={{ color: mark.hex }}>
          {children}
          <div style={{ margin: 0 }}>
            <GoogleAds layoutKey='-5s+ck+w-bk+hr' slot='3195818756' />
          </div>
        </div>
      );
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a
          rel='noreferrer'
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
