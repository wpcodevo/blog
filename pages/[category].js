import { useState } from "react";
import dynamic from "next/dynamic";
import Layout from "components/Layout";
import { useGetBlogPages } from "actions/Pagination";
const FilteringMenu = dynamic(() => import("components/FilteringMenu"));
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
import {
  getBlogsByCategory,
  getPaginatedBlogs,
  getCategories,
  onBlogUpdate,
} from "lib/api";
import { urlFor } from "lib/api";

function Category({ blogs, category }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogPages({
    category,
    blogs,
    filter,
  });

  return (
    <>
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
