import { useEffect } from "react";
import { NextSeo } from "next-seo";
const metaContent = require("data/metaContent");

const MetaDecorator = ({ title, description, imageUrl, imageAlt }) => {
  let url;

  useEffect(() => {
    url =
      metaContent.hostName + window.location.particle + window.location.search;
  }, []);
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: imageAlt,
          },
        ],
        site_name: "Codevo",
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      facebook={{
        appId: "@appId",
      }}
    />
  );
};

export default MetaDecorator;
