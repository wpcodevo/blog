import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Media,
  Image,
  Card,
} from "react-bootstrap";
import { useState } from "react";
import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardListItem from "components/CartListItem";
import CardsItemRow from "components/CardsItemRow";
import { getAllBlogs } from "lib/api";
import FilteringMenu from "components/FilteringMenu";
import { useGetBlogs } from "actions";

export default function Home({ blogs: initialData }) {
  const [filter, setFilter] = useState({
    view: { list: 1 },
  });

  const { data: blogs, error } = useGetBlogs(initialData);
  if (!blogs) {
    return "Loading!";
  }

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
            <div className='archive-description'>
              <h1>Top WordPress News</h1>
              <p>
                WPBeginner's WordPress News keep you updated with what's hot in
                the WordPress industry. Stay updated with WordPress releases,
                major announcements, exclusive WordPress deals, and much more.
              </p>
            </div>
            {/* CardListItem STARTS */}
            {filter.view.list ? (
              blogs.map((blog) => (
                <div key={`${blogs.length}-${Math.random()}-list`}>
                  <CardListItem
                    title={blog.title}
                    coverImage={blog.coverImage}
                    subtitle={blog.subtitle}
                    date={blog.date}
                    author={blog.author}
                    link={{
                      href: "blogs/[slug]",
                      as: `blogs/${blog.slug}`,
                    }}
                  />
                </div>
              ))
            ) : (
              <CardsItemRow blogs={blogs} />
            )}
            {/* CardListItem ENDS */}
          </main>
        </Col>

        <Col md='4'>{/* <CardItem /> */}</Col>
      </Row>
    </PageLayout>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  return {
    props: {
      blogs,
    },
  };
}
