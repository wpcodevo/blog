import { Card } from "react-bootstrap";
import Link from "next/link";
import { urlFor } from "lib/api";
import { format, parseISO } from "date-fns";

const CardListItem = ({ title, subtitle, date, author, smallImage, link }) => {
  return (
    <Card className={`fj-card fj-card-list card-wrapper`}>
      <div className='card-body-wrapper'>
        <Card.Body className='mb2'>
          <h1 className='card-main-title'>
            <Link {...link}>
              <a
                aria-label='title'
                className='no-italic'
                style={{ padding: 5 }}
              >
                {title}
              </a>
            </Link>
          </h1>

          <div className='authorInfo'>
            {format(parseISO(date), "PPP")} by{" "}
            <span>
              <Link href='/about'>
                <a className='orange-text'>{author.name}</a>
              </Link>
            </span>
          </div>
          <div className='card-flex'>
            <Link {...link}>
              <a aria-label={smallImage.alt} className='card-link'>
                <Card.Img
                  variant='top'
                  style={{
                    imageRendering: "-webkit-optimize-contrast",
                  }}
                  src={urlFor(smallImage)
                    .width(300)
                    .height(240)
                    .fit("clip")
                    .url()}
                  alt={smallImage.alt}
                />
              </a>
            </Link>

            <Card.Text style={{ fontSize: "15px !important" }}>
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
