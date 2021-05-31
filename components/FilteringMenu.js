import { BiListUl, BiBorderAll } from "react-icons/bi";
import { IconContext } from "react-icons/lib";

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className='filtering-menu'>
      <div onClick={() => onChange("view", { list: !filter.view.list })}>
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
    </div>
  );
};

export default FilteringMenu;
