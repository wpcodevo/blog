import { useState, useEffect } from "react";

const ScrollProgress = () => {
  const [fix, setFix] = useState(false);

  function progressBarScroll() {
    let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop,
      height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight,
      scrolled = (winScroll / height) * 100;
    document.getElementById("scroll-progress").style.width = scrolled + "%";
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      progressBarScroll();
      const scrollHeight = window.pageYOffset;
      if (scrollHeight > 79) {
        setFix(true);
      }
    });
  });

  return (
    <div
      id='scroll-progress'
      className={`scroll-progres ${fix ? "fix" : ""} `}
    ></div>
  );
};

export default ScrollProgress;
