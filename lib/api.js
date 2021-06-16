import client, { previewClient } from "./sanity";
import imageUrlBuilder from "@sanity/image-url";

const blogFields = `title,subtitle,"slug": slug.current, coverImage, 'file': file.asset->url ,date, tags, 'author': author->{name ,'alt': avatar.alt,'avatar': avatar.asset->url}`;

export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
const getClient = (preview) => (preview ? previewClient : client);

export async function getBlogBySlug(slug, preview) {
  const currentClient = getClient(preview);
  const result = await currentClient
    .fetch(
      `*[_type == 'blog' && slug.current == $slug]{${blogFields} ,content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}}`,
      {
        slug,
        enabled: preview,
      }
    )
    .then((res) => {
      return preview ? (res?.[1] ? res[1] : res[0]) : res?.[0];
    });

  return result;
}

export const onBlogUpdate = (slug) => {
  const client = getClient(true);
  return client.listen(
    `*[_type == "blog" && slug.current == $slug] {
    ${blogFields}
    content[]{..., "asset": asset->,markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}
  }`,
    { slug }
  );
};

export async function getPaginatedBlogs(
  { offset, date } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date ${date}) [${offset}...${
      offset + 6
    }]{${blogFields} ,content}`
  );
  return results;
}

export async function getBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] | order(date desc) {${blogFields},content}`
  );
  return results;
}

export async function getContact() {
  const results = await client.fetch(
    `*[_type == "contact"]{title,content[]{...,"asset": asset->}}`
  );
  return results;
}

export async function getTerms() {
  const results = await client.fetch(`*[_type == "terms"]{title,content}`);
  return results;
}

export async function getPrivacy() {
  const results = await client.fetch(`*[_type == "privacy"]{title,content}`);
  return results;
}

export async function getAbout() {
  const results = await client.fetch(
    `*[_type == "about"]{title,content[]{...,"asset": asset->}}`
  );
  return results;
}
