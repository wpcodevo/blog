import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Error from "next/error";
import { useGetBlogs } from "actions/Pagination";
import { NextSeo } from "next-seo";
const FilteringMenu = dynamic(() => import("components/FilteringMenu"));
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
import { getPaginatedBlogs } from "lib/api";
const CardListItem = dynamic(() => import("components/CardListItem"));
const CardsItemRow = dynamic(() => import("components/CardsItemRow"));
const Aside = dynamic(() => import("components/Aside"));
const Breadcrumbs = dynamic(() => import("nextjs-breadcrumbs"));

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

function Blogs({ blogs }) {
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
      <NextSeo title='Codevo Blogs' />
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

export default Blogs;

export async function getStaticProps() {
  const blogs = await getPaginatedBlogs({ offset: 0, date: "desc" });
  return {
    props: {
      blogs,
    },
    revalidate: 1,
  };
}
