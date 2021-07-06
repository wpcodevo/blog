import { useEffect } from "react";
import { NextSeo, ArticleJsonLd } from "next-seo";
const metaContent = require("data/metaContent");
const content = require("data/content");

export const SEO = {
  title: content.title,
  description: content.description,
  openGraph: {
    type: "website",
    locale: content.language,
    url: content.siteUrl,
    title: content.title,
    description: content.description,
    images: [
      {
        url: `${content.imageUrl}`,
        alt: content.imageAlt,
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    handle: content.twitter,
    site: content.twitter,
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "author",
      content: content.author,
    },
  ],
};

export const PageSeo = ({ title, description, url, tags = [] }) => {
  return (
    <NextSeo
      title={`${title}`}
      description={description}
      canonical={url}
      openGraph={{
        type: "article",
        url,
        title,
        description,
        article: {
          tags,
        },
        images: [
          {
            url: `${content.imageUrl}`,
            width: 800,
            height: 600,
            alt: `${content.imageAlt}`,
          },
        ],
      }}
      additionalMetaTags={[
        {
          name: "twitter:image",
          content: `${content.imageUrl}`,
        },
      ]}
    />
  );
};

const MetaDecorator = ({
  title,
  description,
  imageUrl,
  createdAt,
  imageAlt,
  updatedAt,
  tags,
}) => {
  let url;

  useEffect(() => {
    url =
      metaContent.hostName + window.location.particle + window.location.search;
  }, []);
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "article",
          url,
          title,
          description,
          article: {
            publishedTime: createdAt,
            modifiedTime: updatedAt,
            authors: [`${content.siteUrl}/about`],
            tags,
          },
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
      <ArticleJsonLd
        authorName={content.author}
        dateModified={updatedAt}
        datePublished={createdAt}
        description={description}
        images={[
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: imageAlt,
          },
        ]}
        publisherName={content.author}
        title={title}
        url={url}
        publisherLogo={content.logo}
      />
    </>
  );
};

export default MetaDecorator;
