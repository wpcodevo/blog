import Link from "next/link";

const SearchListItem = ({ title, date, subtitle, link, siteUrl }) => {
  return (
    <div className='search'>
      <Link {...link}>
        <a className='search-link'>
          {title.length > 55 ? title.substr(0, 55) + " ..." : title}
        </a>
      </Link>
      <Link {...link}>
        <a className='search-href'>
          {siteUrl}/{link.as}
        </a>
      </Link>
      <p style={{ fontSize: "15px !important", color: "#555" }}>
        {subtitle.length > 150 ? subtitle.substr(0, 150) + " ..." : subtitle}
      </p>
    </div>
  );
};

export default SearchListItem;
