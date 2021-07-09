import { createClient, createImageUrlBuilder } from "next-sanity";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

const options = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.PROJECT_DATASET,
  useCdn: process.env.NODE_ENV,
  apiVersion: "2021-05-27",
};

export const CustomImage = ({ data, alt, max, w, other }) => {
  const imageProps = useNextSanityImage(options, data.image);
  console.log(imageProps);

  return (
    <Image
      {...imageProps}
      layout='responsive'
      sizes={`(max-width: ${max}px) 100vw, 500px`}
    />
  );
};

export const urlFor = (source) => createImageUrlBuilder(options).image(source);
export const client = createClient(options);
export const previewClient = createClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export const getClient = (preview) => (preview ? previewClient : client);

export default client;
