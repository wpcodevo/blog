import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { Spinner } from "react-bootstrap";
import { useGetBlogPages } from "actions/Pagination";
import { NextSeo } from "next-seo";
const FilteringMenu = dynamic(() => import("components/FilteringMenu"));
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
import { getBlogsByCategory, getCategories } from "lib/api";

function Category({ blogs, category }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });

  const router = useRouter();

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogPages({
    category,
    blogs,
    filter,
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
      <NextSeo title={category.charAt(0).toUpperCase() + category.slice(1)} />
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
      <Layout>
        {pages}
        {/* Button */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <button
            onClick={loadMore}
            disabled={isReachingEnd | isLoadingMore}
            className='load-btn'
          >
            {isLoadingMore
              ? "Loading..."
              : isReachingEnd
              ? "No More Blog"
              : "Load More"}
          </button>
        </div>
      </Layout>
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
