import { useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { useGetBlogs } from "actions/Pagination";
import { PageSeo } from "components/MetaDecorator";
const content = require("data/content");
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
import FilteringMenu from "components/FilteringMenu";
import { getPaginatedBlogs } from "lib/api";
import CardListItem from "components/CardListItem";
import CardsItemRow from "components/CardsItemRow";
import Aside3 from "components/Aside3";
import Breadcrumbs from "nextjs-breadcrumbs";

const BlogList = ({ data = [], filter }) => {
  return data.map((page) => {
    return page.map((blog, index) =>
      filter.view.list ? (
        <div key={`${data.length}-${Math.random()}-list-${index}`}>
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

function AllBlogs({ blogs }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
    date: { asc: 0 },
  });

  const router = useRouter();

  if (!router.isFallback && !blogs) {
    return <Error status={404} />;
  }

  const { data, size, setSize, hitEnd } = useGetBlogs({
    filter,
  });

  return (
    <>
      <PageSeo
        title={`Browse all Blogs - Codevo`}
        description={`Browse all Blogs - Codevo`}
        url={`${content.siteUrl}/blogs`}
      />

      {/* Google Ads */}
      <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
        <AdSense.Google
          client='ca-pub-1057373061381635'
          slot='9967007599'
          style={{ display: "block", height: 200 }}
          format=''
          layout=''
        />
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
            <div className='breadcrumbs'>
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
            <div className={!filter.view.list ? "d-grid" : ""}>
              <BlogList data={data || [blogs]} filter={filter} />
            </div>
            <div style={{ marginTop: "1rem" }}>
              <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
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
        <Aside3 />
      </div>
    </>
  );
}

export default AllBlogs;

export async function getStaticProps() {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
    },
    revalidate: 1,
  };
}
