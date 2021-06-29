import {
  groq,
  createClient,
  createImageUrlBuilder,
  createPreviewSubscriptionHook,
} from "next-sanity";

const options = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: process.env.PROJECT_VERSION,
};

export const urlFor = (source) => createImageUrlBuilder(options).image(source);
export const usePreviewSubscription = createPreviewSubscriptionHook(options);
export const client = createClient(options);
export const previewClient = createClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

export const getClient = (preview) => (preview ? previewClient : client);

export default client;
