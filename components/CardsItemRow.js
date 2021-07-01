import CardItem from "./CardItem";

const CardsItemRow = ({ blog }) => {
  return (
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
  );
};

export default CardsItemRow;
