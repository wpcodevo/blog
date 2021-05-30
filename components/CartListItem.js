import { Card } from "react-bootstrap";

const CardListItem = ({ blog }) => (
  <Card className={`fj-card fj-card-list card-wrapper`}>
    <div className='card-body-wrapper'>
      <Card.Body className='mb2'>
        <Card.Title className='card-main-title'>
          {/* MemberPress Creators Have Earned over $1 billion dollars (Milestone
          Update) */}
          {blog.title}
        </Card.Title>
        <div className='authorInfo'>
          Posted on March 9th, 2021 by{" "}
          <span className='orange-text'>{blog.author.name}</span>
        </div>
        <div className='card-flex'>
          <a href='' className='card-link'>
            <Card.Img
              variant='top'
              className='card-img'
              src='holder.js/50px50px'
            />
          </a>
          <Card.Text className='card-main-text'>
            {/* It’s always mind blowing for me to see the impact WordPress makes on
            the global economy. MemberPress, the leading WordPress membership
            and course platform, announced today that they have passed the
            milestone of $1 billion dollars in creator earnings…{" "} */}
            {blog.subtitle}
            <a href='#' className='orange-text card-button'>
              READ MORE
            </a>
          </Card.Text>
        </div>
      </Card.Body>
    </div>
  </Card>
);

export default CardListItem;
