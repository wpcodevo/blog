import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import FilteringMenu from "components/FilteringMenu";
import { getPaginatedBlogs } from "lib/api";
import { useGetBlogPages } from "actions/Pagination";
import { PreviewAlert } from "components/PreviewAlert";

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
    <PageLayout>
      {/* <AuthorIntro /> */}
      <FilteringMenu
        filter={filter}
        onChange={(option, value) => {
          setFilter({ ...filter, [option]: value });
        }}
      />
      <Row className='mb-5'>
        <Col md='10 wrapper-lg'>
          <main className='main-content'>
            {preview && <PreviewAlert />}
            {pages}
          </main>
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
        </Col>

        <Col md='4'>{/* <CardItem /> */}</Col>
      </Row>
    </PageLayout>
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
  };
}
