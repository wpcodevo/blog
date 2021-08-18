import client, { previewClient, urlFor } from "./sanity";

const blogFields = ` _id,title,_createdAt,_updatedAt,subtitle,shorttitle,"slug": slug.current, download, downloadLink ,coverImage, smallImage,'file': file.asset->url ,date, tags, 'author': author->{name ,'alt': avatar.alt,bio,'avatar': avatar.asset->url}`;

export { urlFor };
const getClient = (preview) => (preview ? previewClient : client);

export async function getBlogBySlug(slug, preview) {
  const result = await getClient(preview)
    .fetch(
      `*[_type == 'blog' && slug.current == $slug]{${blogFields} ,
      'comments': *[_type == "comment" && blog._ref == ^._id && approved == true]{_id, name, email, comment, _createdAt},content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}}`,
      {
        slug,
        preview,
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
      offset + 10
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

export async function getBlogsByCategory(
  { category, offset, date } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == 'blog' && '${category}' in categories[]->slug.current] | order(date ${date}) [${offset}...${
      offset + 6
    }] {${blogFields} ,content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}}`,
    { category }
  );
  return results;
}

export async function getBlogsByQuery(
  { query, offset, date } = { offset: 0, date: "desc" }
) {
  const results = await client.fetch(
    `*[_type == 'blog' && [title, content] match '${query}'] | order(date ${date}) [${offset}...${
      offset + 10
    }] {${blogFields} ,content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}}`,
    { query }
  );
  return results;
}
export async function getSearchBlogs({ query }) {
  const results = await client.fetch(
    `*[_type == 'blog' && [title, content] match '${query}'] 
    {${blogFields}} `,
    { query }
  );
  return results;
}

export async function getTechBlogs() {
  const results = await client.fetch(
    `*[_type == 'blog' && 'technology' in categories[]->slug.current] {${blogFields} ,content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,       
      }
    }}}[0...4]`
  );
  return results;
}

export async function getDealsBlogs() {
  const results = await client.fetch(
    `*[_type == 'blog' && 'deals' in categories[]->slug.current] {${blogFields} ,content[]{...,"asset": asset->, markDefs[]{
  		...,
      _type == "internalLink" => {
        "slug": @.reference->slug,
      }
    }}}[0...4]`
  );
  return results;
}

export async function getPopularBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] {${blogFields},content} | order(popularity desc)[0..4] `
  );
  return results;
}

export async function getTwoPopularBlogs() {
  const results = await client.fetch(
    `*[_type == "blog"] {${blogFields},content} | order(date desc)[0..2] `
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
    `*[_type == "author"]{title,bio[]{...,"asset": asset->}}`
  );
  return results;
}

export async function getCategories() {
  const results = await client.fetch(
    `*[_type == "category"]{title, description,'slug': slug.current,'icon': { 'image': icon.asset->url, 'alt': icon.alt}}`
  );
  return results;
}
