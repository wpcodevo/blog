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
import DownloadFile from "components/DownloadFile";
import Layout from "components/Layout";
import MetaDecorator from "components/MetaDecorator";
import GoogleAds from "components/GoogleAds";

function BlogDetails({ blog: initialBlog, preview }) {
  const router = useRouter();
  const [counter, setCounter] = useState(0);
  const [showLink, setShowLink] = useState(false);
  const [blog, setBlog] = useState(initialBlog);

  let tags = "";
  // console.log(initialBlog.tags);

  // if (initialBlog.tags) {
  //   const blogTags = initialBlog.tags?.map((a) => a.value);
  //   tags = blogTags.join("");
  // }

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
      <MetaDecorator
        title={initialBlog.title}
        description={initialBlog.subtitle}
        imageUrl={urlFor(initialBlog.coverImage).url()}
        imageAlt={initialBlog.title}
      />
      {/* Google Ads */}
      <div className='google-ads'>
        <GoogleAds slot='9967007599' layout='in-article' format='fluid' />
      </div>
      <Layout blog={initialBlog} tags={tags}>
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
