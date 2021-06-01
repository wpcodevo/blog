import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import { urlFor } from "lib/api";

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => {
      return (
        <HighlightCode language={language}>
          {code}
          <div className='code-filename'>{filename}</div>
        </HighlightCode>
      );
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <div className={`block-img block-img-${position}`}>
          <img src={urlFor(asset.url).height(300).url()} alt={alt} />
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
          href={href}
          style={{ color: "#ff6200" }}
          target='_blank'
          rel='noopener'
        >
          {children}
        </a>
      ) : (
        <a href={href} style={{ color: "#ff6200" }}>
          {children}
        </a>
      );
    },
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/blogs/${slug.current}`;
      return (
        <a href={href} style={{ color: "#ff6200" }}>
          {children}
        </a>
      );
    },
  },
};

const BlogContent = ({ content }) => {
  return <BlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;
