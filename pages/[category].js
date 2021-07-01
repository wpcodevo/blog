import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { useGetBlogsPages } from "actions/Pagination";
import { NextSeo } from "next-seo";
const FilteringMenu = dynamic(() => import("components/FilteringMenu"));
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
import { getBlogsByCategory, getCategories } from "lib/api";

const CardListItem = dynamic(() => import("components/CardListItem"));
const CardsItemRow = dynamic(() => import("components/CardsItemRow"));
const Aside = dynamic(() => import("components/Aside"));

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

  const { data, size, setSize, hitEnd } = useGetBlogsPages({
    filter,
    category,
  });

  if (router.isFallback) {
    return (
      <Layout className='center d-flex'>
        <div style={{ textAlign: "center" }}>
          <Spinner animation='border' variant='danger' />
        </div>
      </Layout>
    );
  }

  return (
    <>
      <NextSeo title={`Category - ${category}`} />
      {/* Google Ads */}
      <div style={{ marginTop: "1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>
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
                {hitEnd ? "No More Blog" : "Load More"}
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
    fallback: true,
  };
}
