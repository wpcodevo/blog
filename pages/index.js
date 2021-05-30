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

import PageLayout from "components/PageLayout";
import AuthorIntro from "components/AuthorIntro";
import CardListItem from "components/CartListItem";
import CardsItemRow from "components/CardsItemRow";
import { getAllBlogs } from "lib/api";

export default function Home({ blogs }) {
  return (
    <PageLayout>
      <AuthorIntro />
      <hr />
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
            {/* {blogs.map((blog) => (
              <div key={`${blogs.length}-list`}>
                <CardListItem blog={blog} />
              </div>
            ))} */}

            <CardsItemRow blogs={blogs} />

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
