import sanityClient from "@sanity/client";

const options = {
  projectId: process.env.PROJECT_ID,
  dataset: process.env.PROJECT_DATASET,
  useCdn: process.env.NODE_ENV === "production",
  apiVersion: process.env.PROJECT_VERSION,
};

export default sanityClient(options);
