import { useState } from "react";
import dynamic from "next/dynamic";
import FilteringMenu from "components/FilteringMenu";
import { getPaginatedBlogs } from "lib/api";
import { useGetBlogPages } from "actions/Pagination";
import Layout from "components/Layout";
// import { PreviewAlert } from "components/PreviewAlert";
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));

function Home({ blogs, preview }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });

  const { pages, isLoadingMore, isReachingEnd, loadMore } = useGetBlogPages({
    blogs,
    filter,
  });

  return (
    <>
      {/* Google Ads */}
      <div className='google-ads'></div>
      {/* <AuthorIntro /> */}
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <Layout>
        {preview && <PreviewAlert />}
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

export default Home;

export async function getStaticProps({ preview = false }) {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
      preview,
    },
    revalidate: 60,
  };
}
