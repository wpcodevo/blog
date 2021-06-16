import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Image, Spinner } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import dynamic from "next/dynamic";
import ErrorPage from "next/error";
import { getBlogBySlug, getPaginatedBlogs, urlFor, postQuery } from "lib/api";
import Layout from "components/Layout";
import MetaDecorator from "components/MetaDecorator";
import { usePreviewSubscription } from "lib/sanity";
const ShareSocial = dynamic(() => import("components/ShareSocial"));
const DownloadFile = dynamic(() => import("components/DownloadFile"));
const Moment = dynamic(() => import("react-moment"));
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
const BlogContent = dynamic(() => import("components/BlogContent"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spinner animation='border' variant='danger' />
    </div>
  ),
});

function BlogDetails({ initialBlog, preview }) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [previewBlog, setPreviewBlog] = useState(initialBlog);

  let post = null;

  if (preview) {
    const {
      data: { blog },
    } = usePreviewSubscription(postQuery, {
      params: { slug: initialBlog?.slug.current },
      initialData: initialBlog,
      enabled: preview,
    });
    post = blog;
  }

  const blogPost = previewBlog ? previewBlog : initialBlog;

  if (!router.isFallback && !initialBlog?.slug) {
    return <ErrorPage statusCode='404' />;
  }

  if (router.isFallback) {
    return (
      <PageLayout className='center d-flex'>
        <div>
          <Spinner animation='border' variant='danger' />
        </div>
      </PageLayout>
    );
  }

  useEffect(() => {
    if (post) {
      setPreviewBlog(post);
    }
  }, []);

  useEffect(() => {
    const timer =
      showLink & (counter > 0) &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const setTime = () => {
    setShowLink(!showLink);
    setCounter(50);
  };

  return (
    <>
      <MetaDecorator
        title={blogPost.title}
        description={blogPost.subtitle}
        imageUrl={urlFor(blogPost.coverImage).url()}
        imageAlt={blogPost.title}
      />
      {/* Google Ads */}
      <div className='google-ads'></div>
      <Layout blog={blogPost}>
        {preview && <PreviewAlert />}
        <div className='archive-description'>
          <h1>Top Coding News</h1>
          <p>
            Codevo's Programming News keeps you updated with what's hot in the
            Programming industry. Stay updated with New Technology releases,
            major announcements, exclusive Programming deals, and much more.
          </p>
        </div>

        <Card className={`fj-card fj-card-list card-wrapper card-wrapper-1`}>
          <div className='card-body-wrapper card-body-wrapper-1'>
            <Card.Body className='card-body-1'>
              <Card.Title className='card-main-title'>
                {blogPost.title}
              </Card.Title>
              <div className='authorInfo'>
                Posted on{" "}
                {
                  <Moment format='D MMM YYYY' withTitle>
                    {blogPost.date}
                  </Moment>
                }{" "}
                by <span className='orange-text'>{blogPost.author.name}</span>
              </div>
            </Card.Body>
          </div>
        </Card>

        <ShareSocial />
        {blogPost.coverImage && (
          <Image
            width='100%'
            src={urlFor(blogPost.coverImage).width(600).height(400).url()}
            alt={blogPost.coverImage.alt}
            className='img-fluid rounded pb-4 coverImage'
          />
        )}

        {blogPost.content && <BlogContent content={blogPost.content} />}
        <DownloadFile blog={blogPost} />
      </Layout>
    </>
  );
}

export default BlogDetails;

export async function getStaticProps({ params, preview = false, previewData }) {
  const initialBlog = await getBlogBySlug(params.slug, preview);
  return {
    props: {
      initialBlog,
      preview,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs();
  const paths = blogs?.map((b) => {
    return {
      params: { slug: b.slug },
    };
  });

  return {
    paths,
    fallback: true,
  };
}
