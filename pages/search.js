import { useState } from "react";
import { useRouter } from "next/router";
import { getBlogsByQuery, getSearchBlogs } from "lib/api";
import { useGetSearchBlogs } from "actions/Pagination";
import SearchItem from "components/SearchItem";
import SearchListItem from "components/SearchListItem";
import { PageSeo } from "components/MetaDecorator";
import Aside from "components/Aside";
const content = require("data/content");
import FixGoogleAds from "components/FixGoogleAds";
import Breadcrumbs from "nextjs-breadcrumbs";
import { Spinner } from "react-bootstrap";

let siteUrl = "";
if (process.env.NODE_ENV === "production") {
  siteUrl = content.siteUrl;
} else if (process.env.NODE_ENV === "development") {
  siteUrl = "localhost:3000";
}
const BlogList = ({ data = [] }) => {
  return data.map((page) => {
    return page.map((blog) => (
      <div key={`${data.length}-${Math.random()}-list`}>
        <SearchListItem
          title={blog.title}
          subtitle={blog.subtitle}
          date={blog.date}
          link={{
            href: "blogs/[slug]",
            as: `blogs/${blog.slug}`,
          }}
          siteUrl={siteUrl}
        />
      </div>
    ));
  });
};

function Search({ query, blogs, searchResults }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });
  const router = useRouter();

  if (!router.isFallback && !blogs && !query) {
    return <Error status={404} />;
  }

  const { data, size, error, setSize, hitEnd } = useGetSearchBlogs({
    filter,
    query,
  });

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  return (
    <>
      <PageSeo
        title={`Search Results`}
        description={`Search Results - Codevo`}
        url={`${content.siteUrl}/search?${query}`}
      />
      {/* Google Ads */}
      <FixGoogleAds />
      <div className='layoutWrapper'>
        <div className='wrapper-lg no-border'>
          <main className='main-content no-pad'>
            <div className='breadcrumbs' style={{ marginBottom: 20 }}>
              <Breadcrumbs
                listStyle={{ listStyle: "none", margin: 0, padding: 10 }}
                containerClassName='labelBread'
                // listClassName='labelBread'
                rootLabel='WPCODEVO'
                labelsToUppercase={true}
                inactiveItemStyle={{ color: "#bbb " }}
                transformLabel={(title) =>
                  title.length > 33
                    ? title.substr(0, 33).replace(/-/g, " ") + " ..."
                    : title.replace(/-/g, " ")
                }
              />
            </div>
            <header className='entry'>
              <h1 className='entry-title'>Search results for: {query}</h1>
            </header>
            <SearchItem value={query} />
            <div className='search-stats'>
              About {searchResults.length} results. (0.24 seconds)
            </div>
            <BlogList data={data || [blogs]} filter={filter} />
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

export default Search;

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "s-maxage=20, stale-while-revalidate=40"
  );
  const query = context.query.q;
  const blogs = await getBlogsByQuery({
    query,
    offset: 0,
    date: "desc",
  });

  const searchResults = await getSearchBlogs({
    query,
  });

  return {
    props: {
      query,
      blogs,
      searchResults,
    },
  };
}
