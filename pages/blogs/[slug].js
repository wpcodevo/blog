import { useState, useEffect } from "react";
import { Card, Image, Spinner } from "react-bootstrap";
import PageLayout from "components/PageLayout";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getBlogBySlug, getPaginatedBlogs, onBlogUpdate } from "lib/api";
import ShareSocial from "components/ShareSocial";
import BlogContent from "components/BlogContent";
import { urlFor } from "lib/api";
import moment from "moment";
import { PreviewAlert } from "components/PreviewAlert";
import GoogleFixAds from "components/GoogleFixAds";
import AdSense from "react-adsense";
import { NextSeo } from "next-seo";
import DownloadFile from "components/DownloadFile";
import Layout from "components/Layout";

function BlogDetails({ blog: initialBlog, preview }) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [blog, setBlog] = useState(initialBlog);

  if (!router.isFallback && !blog?.slug) {
    return <ErrorPage statusCode='404' />;
  }

  if (router.isFallback) {
    return (
      <PageLayout className='center'>
        <div>
          <Spinner animation='border' variant='danger' />
        </div>
      </PageLayout>
    );
  }

  useEffect(() => {
    let sub;
    if (preview) {
      sub = onBlogUpdate(blog.slug).subscribe((update) => {
        setBlog(update.result);
      });
    }

    return () => sub && sub.unsubscribe();
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
      <NextSeo
        title={
          blog.title ? blog.title : "Codevo - Exploring and Mastering Code"
        }
        description='Welcome to my website codevo where I share latest coding snippets'
      />
      {/* Google Ads */}
      <div className='google-ads'>
        {/* <AdSense.Google
            client='ca-pub-1057373061381635'
            slot='9967007599'
            style={{ display: "block" }}
            layout='in-article'
            format='fluid'
          /> */}
      </div>
      <Layout blog={initialBlog}>
        {preview && <PreviewAlert />}
        <div className='archive-description'>
          <h1>Top WordPress News</h1>
          <p>
            WPBeginner's WordPress News keep you updated with what's hot in the
            WordPress industry. Stay updated with WordPress releases, major
            announcements, exclusive WordPress deals, and much more.
          </p>
        </div>

        <Card className={`fj-card fj-card-list card-wrapper card-wrapper-1`}>
          <div className='card-body-wrapper card-body-wrapper-1'>
            <Card.Body className='card-body-1'>
              <Card.Title className='card-main-title'>
                {initialBlog.title}
              </Card.Title>
              <div className='authorInfo'>
                Posted on {moment(initialBlog.date).format("LLLL")} by{" "}
                <span className='orange-text'>{initialBlog.author.name}</span>
              </div>
            </Card.Body>
          </div>
        </Card>

        <ShareSocial />
        {initialBlog.coverImage && (
          <Image
            width='100%'
            src={urlFor(initialBlog.coverImage).width(720).height(400).url()}
            alt=''
            className='img-fluid rounded mb-2 pb-4 coverImage'
          />
        )}

        {initialBlog.content && <BlogContent content={initialBlog.content} />}
        <DownloadFile blog={blog} />
      </Layout>
    </>
  );
}

export default BlogDetails;

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: {
      blog,
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
