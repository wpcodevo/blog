import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { urlFor, getPopularBlogs } from "lib/api";
import { format, parseISO } from "date-fns";

const imageLink = {};

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
            className='d-flex mb-3'
            key={`${blog.date}` + index}
            style={{ alignItems: "flex-start" }}
          >
            <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
              <a
                aria-label={blog.smallImage.alt}
                style={{ marginRight: "10px" }}
              >
                <Image
                  width={90}
                  height={70}
                  className='border'
                  src={urlFor(blog.smallImage).width(90).height(70).url()}
                  alt={blog.smallImage.alt}
                />
              </a>
            </Link>
            <div>
              <Link href='/blogs/[slug]' as={`/blogs/${blog.slug}`}>
                <a>
                  <h5
                    style={{ fontSize: "15px", margin: 0 }}
                    className='title-link'
                  >
                    {blog.title.length > 35
                      ? blog.title.substr(0, 35) + " ..."
                      : blog.title}
                  </h5>
                </a>
              </Link>

              <span
                style={{ fontSize: "13px", display: "block", color: "#767676" }}
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
