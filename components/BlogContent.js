import Link from "next/link";
import { urlFor } from "lib/api";
import getYouTubeID from "get-youtube-id";
import dynamic from "next/dynamic";
import BlockContent from "@sanity/block-content-to-react";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const YouTube = dynamic(() => import("react-youtube"), {
  loading: () => (
    <div style={{ width: "100%", height: "45vh", background: "#222" }} />
  ),
});
const HighLightCode = dynamic(() => import("components/HighLightCode"), {
  loading: () => (
    <div style={{ width: "100%", height: "45vh", background: "#222" }} />
  ),
});

import Image from "next/image";

const customSerializer = {
  types: {
    block: ({ node, children }) => {
      const style = node.style || "normal";
      if (/^h\d/.test(style)) {
        return (
          <a style={{ display: "block" }} href={`#${node._key}`}>
            {children}{" "}
          </a>
        );
      }

      // only return heading blocks
      return null;
    },
    // ignore other block types
    youtube: () => null,
    code: () => null,
    ads: () => null,
    table: () => null,
    image: () => null,
  },
  // marks: {
  //   color: () => null,
  //   link: () => null,
  //   internalLink: () => null,
  // },
};

const serializers = {
  types: {
    block: (props) => {
      const { node, children } = props;
      // Protect against a blank node.style property
      const style = node.style || "normal";
      // find the heading blocks (style == h1,h2,h3 etc)
      if (/^h\d/.test(style)) {
        // set the heading tag (h1,h2,h3,etc)
        const HeadingTag = style;
        return (
          // use the node key as the id, it's guaranteed unique
          // one can also slugify the children spans if one want
          // nicer URLs
          <HeadingTag id={node._key}>
            {children} <a href={`#${node._key}`}></a>
          </HeadingTag>
        );
      }
      if (style === "blockquote") return <blockquote>{children}</blockquote>;
      return BlockContent.defaultSerializers.types.block(props);
    },
    ads: ({}) => {
      return (
        // <div style={{ margin: "0 0 20px" }}>
        //   <GoogleAds slot={process.env.NEXT_PUBLIC_IN_ARTICLE_ADS} />
        // </div>
        <div></div>
      );
    },
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
      return <YouTube className='youtubeWrapper' videoId={id} />;
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <div style={{ position: "relative" }}>
          <Image
            src={urlFor(asset.url).width(900).height(600).url()}
            width={550}
            height={370}
            layout='responsive'
            className='mb-3'
            alt={alt}
          />
        </div>
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
          rel='noreferrer'
          href={href}
          style={{ color: "#ff6200", textDecoration: "underline" }}
          target='_blank'
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

export const TableContent = ({ content }) => {
  return (
    <ul>
      <BlockContent serializers={customSerializer} blocks={content} />
    </ul>
  );
};

export const BlogContent = ({ content }) => {
  return (
    <div className='blockContent'>
      <BlockContent serializers={serializers} blocks={content} />
    </div>
  );
};
