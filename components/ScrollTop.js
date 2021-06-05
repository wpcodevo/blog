import { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

const ScrollTop = () => {
  const [show, setShow] = useState(false);

  const handleScrollTop = () => {
    import("react-scroll").then((scroll) => {
      scroll.animateScroll.scrollToTop({});
    });
  };

  useEffect(() => {
    const showButton = () => {
      setShow(!show);
    };
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        setShow(!show);
      } else {
        setShow(false);
      }
    });

    return window.removeEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        setShow(!show);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <div
      className={`scroll-top ${show ? "showBtn" : ""}`}
      onClick={handleScrollTop}
    >
      <span>
        <AiOutlineArrowUp size='15px' />
      </span>
    </div>
  );
};

export default ScrollTop;
