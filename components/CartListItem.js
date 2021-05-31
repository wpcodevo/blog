import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";

const CardListItem = ({ title, subtitle, date, author, coverImage, link }) => {
  return (
    <Card className={`fj-card fj-card-list card-wrapper`}>
      <div className='card-body-wrapper'>
        <Card.Body className='mb2'>
          <Link {...link}>
            <a className='no-italic'>
              <Card.Title className='card-main-title'>{title}</Card.Title>
            </a>
          </Link>
          <div className='authorInfo'>
            Posted on {date} by{" "}
            <span className='orange-text'>{author.name}</span>
          </div>
          <div className='card-flex'>
            <Link {...link}>
              <a className='card-link'>
                <Card.Img
                  variant='top'
                  className='card-img'
                  src={urlFor(coverImage)
                    .width(180)
                    .height(180)
                    .fit("clip")
                    .url()}
                />
              </a>
            </Link>

            <Card.Text className='card-main-text'>
              {/* It’s always mind blowing for me to see the impact WordPress makes on
            the global economy. MemberPress, the leading WordPress membership
            and course platform, announced today that they have passed the
            milestone of $1 billion dollars in creator earnings…{" "} */}
              {subtitle}
              <Link {...link}>
                <a className='orange-text italic'>READ MORE</a>
              </Link>
            </Card.Text>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardListItem;
