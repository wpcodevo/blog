import { useState } from "react";
import { Card, Image, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { getBlogBySlug, getPaginatedBlogs, onBlogUpdate } from "lib/api";
import { urlFor } from "lib/api";
import Layout from "components/Layout";
import MetaDecorator from "components/MetaDecorator";
const ShareSocial = dynamic(() => import("components/ShareSocial"));
const DownloadFile = dynamic(() => import("components/DownloadFile"));
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
import { format, parseISO } from "date-fns";
const Breadcrumbs = dynamic(() => import("nextjs-breadcrumbs"));

const GoogleAds = dynamic(() => import("components/GoogleAds"), {
  loading: () => <div style={{ height: 0 }}></div>,
});
const CommentForm = dynamic(() => import("components/CommentForm"));
import { Comments } from "components/Comments";
import NewsLetter from "components/NewsLetter";

const BlogContent = dynamic(() => import("components/BlogContent"));

function BlogDetails({ blog: initialBlog, preview }) {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);

  if (!router.isFallback && !initialBlog?.slug) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return (
      <div className='fallbackHeight'>
        <div
          style={{
            height: "100%",
            width: "100%",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation='border' variant='danger' />
        </div>
      </div>
    );
  }

  function setUpdate() {
    let sub;
    if (preview) {
      sub = onBlogUpdate(blog.slug).subscribe((update) => {
        setBlog(update.result);
      });

      return () => sub && sub.unsubscribe();
    }
  }

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
        <div style={{ margin: "1rem 0 1rem" }}>
          <GoogleAds slot={process.env.HORIZONTAL_SLOT} />
        </div>

        <Card className={`fj-card fj-card-list card-wrapper card-wrapper-1`}>
          <div className='card-body-wrapper card-body-wrapper-1'>
            <Card.Body className='card-body-1'>
              <h1 className='blockContent-title'>{initialBlog.title}</h1>
              <div className='authorInfo'>
                Posted on {format(parseISO(initialBlog.date), "PPP")} by{" "}
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

        <Comments comments={initialBlog.comments} />
        <CommentForm _id={initialBlog._id} />
        <NewsLetter />
      </Layout>
    </>
  );
}

export default BlogDetails;

export async function getStaticProps({ params, preview = false, previewData }) {
  const blog = await getBlogBySlug(params.slug, preview);
  return {
    props: {
      preview,
      blog: blog || null,
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
