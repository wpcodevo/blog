import { Row, Col, Card, Image } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import { getBlogById, getAllBlogs } from "lib/api";
import ShareSocial from "components/ShareSocial";
import BlogContent from "components/BlogContent";
import { urlFor } from "lib/api";

function BlogDetails({ blog }) {
  return (
    <PageLayout>
      <Row className='mb-5'>
        <Col className='wrapper-lg'>
          <main className='main-content'>
            <div className='archive-description'>
              <h1>Top WordPress News</h1>
              <p>
                WPBeginner's WordPress News keep you updated with what's hot in
                the WordPress industry. Stay updated with WordPress releases,
                major announcements, exclusive WordPress deals, and much more.
              </p>
            </div>

            <Card
              className={`fj-card fj-card-list card-wrapper card-wrapper-1`}
            >
              <div className='card-body-wrapper card-body-wrapper-1'>
                <Card.Body className='card-body-1'>
                  <Card.Title className='card-main-title'>
                    {blog.title}
                  </Card.Title>
                  <div className='authorInfo'>
                    Posted on {blog.date} by{" "}
                    <span className='orange-text'>{blog.author.name}</span>
                  </div>
                </Card.Body>
              </div>
            </Card>

            <ShareSocial />
            <Image
              width='100%'
              src={urlFor(blog.coverImage).height(300).url()}
              alt=''
              className='img-fluid rounded mb-2 pb-4'
            />

            {<BlogContent content={blog.content} />}
          </main>
        </Col>
      </Row>
    </PageLayout>
  );
}

export default BlogDetails;

export async function getStaticProps({ params }) {
  const blog = await getBlogById(params.slug);
  return {
    props: {
      blog,
    },
  };
}

export async function getStaticPaths() {
  const blogs = await getAllBlogs();
  const paths = blogs?.map((b) => {
    return {
      params: { slug: b.slug },
    };
  });
  return {
    paths,
    fallback: false,
  };
}
