import { Image } from "react-bootstrap";
import { urlFor } from "lib/api";
import dynamic from "next/dynamic";
import Link from "next/link";
import { NextSeo } from "next-seo";
import { getCategories } from "lib/api";
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});

const Categories = ({ categories }) => {
  return (
    <>
      <NextSeo title='Categories' />

      <div style={{ margin: "1rem 0 1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>
      <div style={{ padding: "1rem" }}>
        <h2>All Categories</h2>
        <div className='category-grid'>
          {categories.map((category, index) => (
            <div className='category d-flex' key={`${category.title}-${index}`}>
              <Image
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "5px 0 5px",
                }}
                src={
                  urlFor(category.icon.image).width(50).height(50).url() ||
                  "https://via.placeholder.com/50"
                }
                alt={category.icon.alt}
                rounded
              />
              <h3>{category.title}</h3>
              <p>
                {category.description.length > 85
                  ? category.description.substr(0, 85) + " ..."
                  : category.description}
              </p>
              <Link href='/[category]' as={`/${category.slug}`}>
                <a>Articles</a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;

export async function getStaticProps() {
  const categories = await getCategories();
  return {
    props: {
      categories,
    },
    revalidate: 1,
  };
}
