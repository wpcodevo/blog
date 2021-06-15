import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import Moment from "react-moment";

const CardListItem = ({ title, subtitle, date, author, coverImage, link }) => {
  return (
    <Card className={`fj-card fj-card-list card-wrapper`}>
      <div className='card-body-wrapper'>
        <Card.Body className='mb2'>
          <Link {...link}>
            <a aria-label='title' className='no-italic'>
              <Card.Title className='card-main-title'>{title}</Card.Title>
            </a>
          </Link>
          <div className='authorInfo'>
            Posted on{" "}
            {
              <Moment format='D MMM YYYY' withTitle>
                {date}
              </Moment>
            }{" "}
            by <span className='orange-text'>{author.name}</span>
          </div>
          <div className='card-flex'>
            <Link {...link}>
              <a aria-label={coverImage.alt} className='card-link'>
                <Card.Img
                  variant='top'
                  className='card-img list-img'
                  src={urlFor(coverImage)
                    .width(298)
                    .height(298)
                    .fit("clip")
                    .url()}
                  alt={coverImage.alt}
                />
              </a>
            </Link>

            <Card.Text className='card-main-text'>
              {subtitle.length > 252
                ? subtitle.substr(0, 252) + " ..."
                : subtitle}
              <Link {...link}>
                <a aria-label='read more' className='orange-text italic'>
                  {" "}
                  READ MORE
                </a>
              </Link>
            </Card.Text>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardListItem;
