import Link from "next/link";
import { useState, useEffect } from "react";
import { Image } from "react-bootstrap";
import { urlFor, getPopularBlogs } from "lib/api";
import { format, parseISO } from "date-fns";

const PopularBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    const res = await getPopularBlogs();
    setBlogs(res);
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='d-flex mt-3' style={{ flexDirection: "column" }}>
      {blogs.map((blog, index) => {
        return (
          <div
            className='d-flex mb-4'
            key={`${blog.date}` + index}
            style={{ alignItems: "flex-start" }}
          >
            <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
              <a
                aria-label={blog.smallImage.alt}
                style={{ marginRight: "10px" }}
              >
                <Image
                  style={{
                    width: "90px",
                    height: "60px",
                    objectFit: "cover",
                    border: "1px solid #ddd",
                  }}
                  width='100%'
                  src={urlFor(blog.smallImage).width(100).height(70).url()}
                  alt={blog.smallImage.alt}
                  className='img-fluid rounded'
                />
              </a>
            </Link>
            <div>
              <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
                <a>
                  <h5 style={{ fontSize: "14px" }} className='title-link'>
                    {blog.title.length > 35
                      ? blog.title.substr(0, 35) + " ..."
                      : blog.title}
                  </h5>
                </a>
              </Link>

              <span
                style={{ fontSize: "11px", display: "block", color: "#767676" }}
              >
                {format(parseISO(blog.date), "PPP")}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PopularBlogs;
