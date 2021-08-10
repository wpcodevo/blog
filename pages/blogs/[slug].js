import { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Error from "next/error";
import dynamic from "next/dynamic";
import { getBlogBySlug, getPaginatedBlogs, onBlogUpdate } from "lib/api";
import { urlFor } from "lib/api";
import Layout from "components/Layout";
import MetaDecorator from "components/MetaDecorator";
import ShareSocial from "components/ShareSocial";
const DownloadFile = dynamic(() => import("components/DownloadFile"));
const PreviewAlert = dynamic(() => import("components/PreviewAlert"));
import Breadcrumbs from "nextjs-breadcrumbs";
import { format, parseISO } from "date-fns";
import AdSense from "react-adsense";
import GoogleAds from "components/GoogleAds";
const CommentForm = dynamic(() => import("components/CommentForm"));
import { Comments } from "components/Comments";
import NewsLetter from "components/NewsLetter";
import BlogContent from "components/BlogContent";
import Image from "next/image";

function BlogDetails({ blog: initialBlog, preview }) {
  const router = useRouter();
  const [blog, setBlog] = useState(initialBlog);

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

  if (!router.isFallback && !initialBlog?.slug) {
    return <Error statusCode={404} />;
  }

  const tags = blog?.tags.map((tag) => tag.value.slice(1));

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
        updatedAt={initialBlog._updatedAt}
        createdAt={initialBlog._createdAt}
        tags={tags}
      />
      {/* Google Ads */}
      <div className='horizontal' style={{ margin: "1rem 0 1rem" }}>
        <AdSense.Google
          client={process.env.NEXT_PUBLIC_DATA_AD_CLIENT}
          slot={process.env.NEXT_PUBLIC_DISPLAY_ADS}
          style={{ display: "block", height: 200 }}
          format=''
          layout=''
        />
      </div>
      <Layout blog={initialBlog}>
        {preview && <PreviewAlert />}

        <Breadcrumbs
          listStyle={{ listStyle: "none", margin: "0 0 15px", padding: 10 }}
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
            width={600}
            height={400}
            className='border mb-3'
            layout='responsive'
            src={urlFor(initialBlog.coverImage).width(600).height(400).url()}
            alt={initialBlog.coverImage.alt}
          />
        )}

        {initialBlog.content && <BlogContent content={initialBlog.content} />}
        <div style={{ margin: "1rem 0 1rem" }}>
          <GoogleAds slot={process.env.NEXT_PUBLIC_DISPLAY_ADS} />
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
