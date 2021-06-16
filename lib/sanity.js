import { createClient, createPreviewSubscriptionHook } from "next-sanity";

const options = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: "2021-03-25",
};

export const usePreviewSubscription = createPreviewSubscriptionHook(options);

export const previewClient = createClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  ignoreBrowserTokenWarning: true,
});

export default createClient(options);
