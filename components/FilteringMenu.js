import { BiListUl, BiBorderAll, BiSortAZ, BiSortZA } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className='filtering-menu'>
      <div onClick={() => onChange("view", { list: +!filter.view.list })}>
        {filter.view.list ? (
          <span>
            <BiListUl size='35px' />
          </span>
        ) : (
          <span>
            <BiBorderAll size='30px' />
          </span>
        )}
      </div>
      <div onClick={() => onChange("date", { asc: +!filter.date.asc })}>
        {filter.date.asc ? (
          <span>
            <BiSortAZ size='30px' />
          </span>
        ) : (
          <span>
            <BiSortZA size='30px' />
          </span>
        )}
      </div>
    </div>
  );
};

export default FilteringMenu;
