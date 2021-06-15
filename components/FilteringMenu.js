import { BiSortAZ, BiSortZA } from "react-icons/bi";
import { AiOutlineBorderInner, AiOutlineUnorderedList } from "react-icons/ai";

const FilteringMenu = ({ onChange, filter }) => {
  return (
    <div className='filtering-menu d-flex'>
      <div onClick={() => onChange("view", { list: +!filter.view.list })}>
        {filter.view.list ? (
          <span>
            <AiOutlineUnorderedList size='30px' />
          </span>
        ) : (
          <span>
            <AiOutlineBorderInner size='30px' />
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
