import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import moment from "moment";

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
            Posted on {moment(date).format("LL")} by{" "}
            <span className='orange-text'>{author.name}</span>
          </div>
          <div className='card-flex'>
            <Link {...link}>
              <a className='card-link'>
                <div className='card-img-wrapper'>
                  <Card.Img
                    variant='top'
                    className='card-img'
                    src={urlFor(coverImage)
                      .width(500)
                      .height(500)
                      .fit("clip")
                      .url()}
                  />
                </div>
              </a>
            </Link>

            <Card.Text className='card-main-text'>
              {subtitle.length > 252
                ? subtitle.substr(0, 252) + " ..."
                : subtitle}
              <Link {...link}>
                <a className='orange-text italic'> READ MORE</a>
              </Link>
            </Card.Text>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default CardListItem;
