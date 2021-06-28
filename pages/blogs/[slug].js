import { useState, useEffect } from "react";
import { Card, Image, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getBlogBySlug, getPaginatedBlogs, onBlogUpdate } from "lib/api";
import { urlFor } from "lib/api";
import Layout from "components/Layout";
import MetaDecorator from "components/MetaDecorator";
const ShareSocial = dynamic(() => import("components/ShareSocial"));
const DownloadFile = dynamic(() => import("components/DownloadFile"));
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
const Moment = dynamic(() => import("react-moment"));
const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const CommentForm = dynamic(() => import("components/CommentForm"));
import { Comments } from "components/Comments";

const BlogContent = dynamic(() => import("components/BlogContent"), {
  loading: () => (
    <div style={{ textAlign: "center" }}>
      <Spinner animation='border' variant='danger' />
    </div>
  ),
});

function BlogDetails({ blog: initialBlog, preview, id, comments }) {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);

  if (router.isFallback) {
    return (
      <Layout className='center d-flex'>
        <div style={{ textAlign: "center" }}>
          <Spinner animation='border' variant='danger' />
        </div>
      </Layout>
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

  return (
    <>
      <MetaDecorator
        title={initialBlog.title}
        description={initialBlog.subtitle}
        imageUrl={urlFor(initialBlog.coverImage).url()}
        imageAlt={initialBlog.title}
      />
      {/* Google Ads */}
      <div style={{ margin: "1rem 0 1rem" }}>
        <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
      </div>
      <Layout blog={initialBlog}>
        {preview && <PreviewAlert />}
        <div className='archive-description'>
          <h2>Top Coding News</h2>
          <p>
            Codevo's Programming News keeps you updated with what's hot in the
            Programming industry. Stay updated with New Technology releases,
            major announcements, exclusive Programming deals, and much more.
          </p>
        </div>
        <div style={{ margin: "1rem 0 1rem" }}>
          <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
        </div>

        <Card className={`fj-card fj-card-list card-wrapper card-wrapper-1`}>
          <div className='card-body-wrapper card-body-wrapper-1'>
            <Card.Body className='card-body-1'>
              <Card.Title className='blockContent-title'>
                {initialBlog.title}
              </Card.Title>
              <div className='authorInfo'>
                Posted on{" "}
                {
                  <Moment format='D MMM YYYY' withTitle>
                    {initialBlog.date}
                  </Moment>
                }{" "}
                by{" "}
                <Link href='/about'>
                  <a>
                    <span className='orange-text'>
                      {initialBlog.author.name}
                    </span>
                  </a>
                </Link>
              </div>
            </Card.Body>
          </div>
        </Card>

        <ShareSocial blog={initialBlog} />
        {initialBlog.coverImage && (
          <Image
            width='100%'
            src={urlFor(initialBlog.coverImage).width(600).height(400).url()}
            alt={initialBlog.coverImage.alt}
            className='img-fluid rounded mb-3 coverImage'
            style={{ border: "1px solid #ddd" }}
          />
        )}

        {initialBlog.content && <BlogContent content={initialBlog.content} />}
        <div style={{ margin: "1rem 0 1rem" }}>
          <GoogleAds layoutKey='-5s+ck+w-bk+hr' slot={process.env.NATIVE_ADS} />
        </div>
        <DownloadFile blog={blog} />

        <Comments comments={comments} />
        <CommentForm _id={id} />
      </Layout>
    </>
  );
}

export default BlogDetails;

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  const id = blog._id;
  const comments = blog.comments;
  return {
    props: {
      preview,
      blog,
      id,
      comments,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const blogs = await getPaginatedBlogs();
  const paths =
    blogs?.map((b) => {
      return {
        params: { slug: b.slug },
      };
    }) || [];

  return {
    paths,
    fallback: true,
  };
}
