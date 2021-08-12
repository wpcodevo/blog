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

let tableofcontent;

const customSerializer = {
  types: {
    block: (props) => {
      const { node, children } = props;
      const style = node.style;
      if (/^h\d/.test(style)) {
        return (
          <li>
            <a href={`#${node._key}`}>{children}</a>
          </li>
        );
      }

      // only return heading block
      return null;
    },
    // ignore other block types
    youtube: () => null,
    code: () => null,
    ads: () => null,
    table: () => null,
    image: () => null,
    tablecontent: () => null,
  },
  marks: {
    color: () => null,
    link: () => null,
    internalLink: () => null,
  },
};

const serializers = {
  types: {
    ads: ({}) => {
      return (
        // <div style={{ margin: "0 0 20px" }}>
        //   <GoogleAds slot={process.env.NEXT_PUBLIC_IN_ARTICLE_ADS} />
        // </div>
        <div></div>
      );
    },
    tablecontent: () => null,
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
          target='_blank'
          aria-label='external link'
          className='hover_underline'
        >
          {children}
        </a>
      ) : (
        <a aria-label='external link' className='hover_underline' href={href}>
          {children}
        </a>
      );
    },
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/blogs/${slug.current}`;
      return (
        <Link href={href}>
          <a className='hover_underline' aria-label='internal link'>
            {children}
          </a>
        </Link>
      );
    },
  },
};

export let TableContent = (content) => {
  tableofcontent = content;
};

export const BlogContent = ({ content }) => {
  return (
    <div className='blockContent'>
      <BlockContent serializers={serializers} blocks={content} />
    </div>
  );
};
