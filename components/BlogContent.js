import BlockContent from "@sanity/block-content-to-react";
import HighlightCode from "components/HighlightCode";
import Highlight from "react-highlight";
import { urlFor } from "lib/api";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => {
      return (
        <Highlight language={language}>
          {code}
          <div className='code-filename'>{filename}</div>
        </Highlight>
      );
    },
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return <YouTube className='youtubeWrapper' videoId={id} />;
    },
    image: ({ node: { alt, asset, position = "center" } }) => {
      return (
        <img
          className={`block-img block-img-${position}`}
          src={urlFor(asset.url).height(300).url()}
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
