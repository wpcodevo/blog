import client from "./sanity";

export async function getAllBlogs() {
  const blogFields = `title,subtitle,"slug": slug.current, "coverImage": coverImage.asset->url, date, 'author': author->{name, 'avatar': avatar.asset->url}`;
  const results = await client.fetch(`*[_type == "blog"]{${blogFields}}`);
  return results;
}

export async function getBlogById(slug) {
  const blogFields = `title,subtitle,"slug": slug.current, "coverImage": coverImage.asset->url, date, 'author': author->{name, 'avatar': avatar.asset->url}`;

  const result = await client
    .fetch(`*[_type == 'blog' && slug.current == $slug]{${blogFields}}`, {
      slug,
    })
    .then((res) => res?.[0]);

  return result;
}
