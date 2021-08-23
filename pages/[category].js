import { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { useGetBlogsPages } from "actions/Pagination";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import { getBlogsByCategory, getCategories } from "lib/api";
import FilteringMenu from "components/FilteringMenu";
import CardListItem from "components/CardListItem";
import CardsItemRow from "components/CardsItemRow";
import Aside from "components/Aside";
import FixGoogleAds from "components/FixGoogleAds";
import { Spinner } from "react-bootstrap";

const BlogList = ({ data = [], filter }) => {
  return data.map((page) => {
    return page.map((blog) =>
      filter.view.list ? (
        <div key={`${data.length}-${Math.random()}-list`}>
          <CardListItem
            title={blog.title}
            smallImage={blog.smallImage}
            subtitle={blog.subtitle}
            date={blog.date}
            author={blog.author}
            link={{
              href: "blogs/[slug]",
              as: `blogs/${blog.slug}`,
            }}
          />
        </div>
      ) : (
        <CardsItemRow blog={blog} />
      )
    );
  });
};

function Category({ blogs, category }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });

  const router = useRouter();

  if (!router.isFallback && !blogs && !category) {
    return <Error status={404} />;
  }

  const { data, size, error, setSize, hitEnd } = useGetBlogsPages({
    filter,
    category,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return (
    <>
      <PageSeo
        title={`All Articles of ${category} - Codevo`}
        description={`Browse all All Articles of ${category} - Codevo`}
        url={`${content.siteUrl}/${category}`}
      />

      {/* Google Ads */}
      <FixGoogleAds />
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            <div className={!filter.view.list ? "d-grid" : ""}>
              <BlogList data={data || [blogs]} filter={filter} />
            </div>
            {/* Button */}
            <div style={{ textAlign: "center", margin: "50px 0 20px" }}>
              <button
                onClick={() => setSize(size + 1)}
                disabled={hitEnd}
                className='load-btn'
              >
                {isLoadingMore ? (
                  <>
                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                    {"  "}
                    loading...
                  </>
                ) : hitEnd ? (
                  "no more blogs"
                ) : (
                  "load more"
                )}
              </button>
            </div>
          </main>
        </div>
        {/* Aside */}
        <Aside />
      </div>
    </>
  );
}

export default Category;

export async function getStaticProps({ params }) {
  const category = params.category;
  const blogs = await getBlogsByCategory({ category, offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      category,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const categories = await getCategories();
  const paths = categories?.map((b) => {
    return {
      params: { category: b.slug },
    };
  });

  return {
    paths,
    fallback: false,
  };
}
