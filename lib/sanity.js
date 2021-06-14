import sanityClient from "@sanity/client";

const options = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: process.env.PROJECT_VERSION,
};

export const previewClient = sanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "v2021-06-07",
});

export default sanityClient(options);
