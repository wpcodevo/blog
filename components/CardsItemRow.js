import CardItem from "./CardItem";

const CardsItemRow = ({ blogs }) => {
  return (
    <div className='d-grid'>
      {blogs.map((blog) => (
        <div key={`${blog.slug}-list`}>
          <CardItem
            title={blog.title}
            subtitle={blog.subtitle}
            slug={blog.slug}
            coverImage={blog.coverImage}
            date={blog.date}
            author={blog.author}
            link={{
              href: "/blogs/[slug]",
              as: `/blogs/${blog.slug}`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CardsItemRow;
