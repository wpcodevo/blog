import CardItem from "./CardItem";

const CardsItemRow = ({ paginatedBlogs }) => {
  return (
    <div className='d-grid'>
      {paginatedBlogs.map((blog) => (
        <div key={`${blog.slug}-list`}>
          <CardItem
            title={blog.title}
            subtitle={blog.subtitle}
            slug={blog.slug}
            smallImage={blog.smallImage}
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
