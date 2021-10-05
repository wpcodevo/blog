import Link from "next/link";
import { urlFor } from "lib/api";
import dynamic from "next/dynamic";
import BlockContent from "@sanity/block-content-to-react";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const HighLightCode = dynamic(() => import("components/HighLightCode"), {
  loading: () => (
    <div style={{ width: "100%", height: "45vh", background: "#222" }} />
  ),
});

import Image from "next/image";

let tableofcontent;

const customSerializer = {
  listItem: () => null,
  list: () => null,
  types: {
    block: (props) => {
      const { node, children } = props;
      const style = node.style;
      if (/^h\d/.test(style)) {
        return (
          <li>
            <a className='orange-text' href={`#${node._key}`}>
              {children}{" "}
            </a>
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
    link: () => null,
    internalLink: () => null,
    color: ({ mark, children }) => {
      return <span style={{ color: mark.hex }}>{children}</span>;
    },
  },
};

const serializers = {
  types: {
    block: (props) => {
      const { node, children } = props;
      // Protect against a blank node.style property
      const style = node.style;
      // find the heading blocks (style == h1,h2,h3 etc)
      if (/^h\d/.test(style)) {
        // set the heading tag (h1,h2,h3,etc)
        const HeadingTag = style;
        return (
          // use the node key as the id, it's guaranteed unique
          // one can also slugify the children spans if one want
          // nicer URLs
          <HeadingTag id={node._key} style={{ color: "#ff6200" }}>
            {children} <a href={`#${node._key}`}></a>
          </HeadingTag>
        );
      }
      if (style === "blockquote") return <blockquote>{children}</blockquote>;
      return BlockContent.defaultSerializers.types.block(props);
    },
    ads: ({}) => {
      return (
        <div style={{ margin: "0 0 20px" }}>
          {/* <GoogleAds slot={process.env.NEXT_PUBLIC_IN_FEED} /> */}
        </div>
      );
    },
    tablecontent: () => {
      return (
        <ul className='tableofcontent'>
          <BlockContent
            serializers={customSerializer}
            blocks={tableofcontent}
          />
        </ul>
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
      return (
        <iframe
          className='youtubeWrapper'
          loading='lazy'
          title='YT Embed'
          width='100%'
          height='315'
          src={`https://www.youtube.com/embed/${node.url.split("/")[3]}`}
          frameBorder='0'
          allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      );
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <div style={{ position: "relative" }}>
          <Image
            src={urlFor(asset.url).width(1000).height(600).url()}
            width={550}
            height={370}
            layout='responsive'
            alt={alt}
          />
        </div>
      );
    },
  },
  marks: {
    heading: ({ children }) => <h4 style={{ color: "#ff6200" }}>{children}</h4>,
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
          className='external_link'
        >
          {children}
        </a>
      ) : (
        <a aria-label='external link' className='external_link' href={href}>
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
