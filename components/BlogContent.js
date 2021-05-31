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
};

const BlogContent = ({ content }) => {
  return <BlockContent serializers={serializers} blocks={content} />;
};

export default BlogContent;
