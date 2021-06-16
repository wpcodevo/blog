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
  token:
    " skelZVTXzUx1J0jj5kMpAQc8uYITLUZpTjicH4QOINLVA9ma2ptJkYRpI8fo0LCJnh5c3L6Bv7PDTr9LUc3FBn6cLeyOwfbHTJy4EBt0pM6O366Zdiw9CBlhGK8QfK4d2MCOF8IP7gzBbDvSR67stWVG5bJn6BInmxdCtyC6GKaVabcZ25zx",
});

export default sanityClient(options);
