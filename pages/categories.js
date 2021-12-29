import { Image } from "react-bootstrap";
import { urlFor } from "lib/api";
import Link from "next/link";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import { getCategories } from "lib/api";

const Categories = ({ categories }) => {
  const tags = categories?.map((category) => category.title);
  return (
    <>
      <PageSeo
        title={`Browse all categories - Codevo`}
        description={`Browse all categories - Codevo`}
        url={`${content.siteUrl}/categories`}
        tags={tags}
      />

      <div style={{ padding: "1rem", marginTop: "30px" }}>
        <h2>All Categories</h2>
        <div className='category-grid'>
          {categories.map((category, index) => (
            <div className='category d-flex' key={`${category.title}-${index}`}>
              <Image
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "5px 0 5px",
                  color: "transparent",
                  borderRadius: "50%",
                  background: "transparent",
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
                {category.description.length > 70
                  ? category.description.substr(0, 70) + " ..."
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
