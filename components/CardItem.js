import { Card } from "react-bootstrap";
import Link from "next/link";

const CardItem = ({ title, subtitle, slug, coverImage, link }) => (
  <Card className={`fj-card`}>
    <div className='card-body-wrapper'>
      <div className='view overlay'>
        {link && (
          <Link {...link}>
            <a>
              <Card.Img
                src={coverImage}
                alt='Card image cap'
                width='250px'
                height='200px'
              />
            </a>
          </Link>
        )}
      </div>
      <Card.Body>
        {link && (
          <Link {...link}>
            <a className='no-italic'>
              <Card.Title className='card-main-title-2'>{title}</Card.Title>
            </a>
          </Link>
        )}

        <Card.Subtitle>{subtitle}</Card.Subtitle>
      </Card.Body>
    </div>
  </Card>
);

export default CardItem;
