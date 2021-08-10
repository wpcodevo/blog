import { createClient, createImageUrlBuilder } from "next-sanity";

const options = {
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_PROJECT_DATASET,
  useCdn: process.env.NODE_ENV,
  apiVersion: process.env.NEXT_PUBLIC_PROJECT_VERSION,
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
