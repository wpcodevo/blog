import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `title,subtitle,"slug": slug.current, coverImage, 'file': file.asset->url ,date, 'author': author->{name ,'avatar': avatar.asset->url}`;

export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const getClient = (preview) => (preview ? previewClient : client);

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(
      `*[_type == 'blog' && slug.current == $slug]{${blogFields} ,content[]{...,"asset": asset->}, markDefs}`,
      {
        slug,
      }
    )
    .then((res) => (preview ? (res?.[1] ? res[1] : res[0]) : res?.[0]));

  return result;
}

export async function getPaginatedBlogs(
  { offset, date } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date ${date}) [${offset}...${
      offset + 6
    }]{${blogFields} ,content , markDefs}`
  );
  return results;
  debugger;
}

export async function getBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields},content,markDefs}`
  );
  return results;
}
