import { useState, useEffect } from "react";
import { FaDownload } from "react-icons/fa";
import Link from "next/link";

const DownloadFile = ({ blog }) => {
  const [counter, setCounter] = useState(0);
  const [showLink, setShowLink] = useState(false);

  useEffect(() => {
    const timer =
      showLink & (counter > 0) &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const setTime = () => {
    setShowLink(!showLink);
    setCounter(59);
  };

  return (
    <>
      {blog?.download && (
        <div
          className={`download-button d-flex ${showLink ? "hide" : ""}`}
          onClick={() => setTime()}
        >
          <span>
            <FaDownload />
          </span>
          <span>Download Code Files</span>
        </div>
      )}
      {showLink && (
        <div className='download-link'>
          <p>
            Generating download link in <span>{counter}s</span>
          </p>
          {counter === 0 && (
            <Link href={blog.downloadLink}>
              <a aria-label='download' style={{ color: "dodgerblue" }}>
                link here
              </a>
            </Link>
          )}
        </div>
      )}
    </>
  );
};

export default DownloadFile;
