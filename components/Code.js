import { useState } from "react";
import dynamic from "next/dynamic";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";

const Highlight = dynamic(() => import("react-highlight"), {
  loading: () => <div style={{ height: "45vh", background: "#222" }} />,
});

const Code = ({ language, filename, code }) => {
  const [isCopy, setisCopy] = useState(false);

  return (
    <div className='code-block'>
      <CopyToClipboard
        text={code}
        className={`code-copy ${isCopy ? "color" : ""}`}
        onCopy={() => setisCopy(true)}
      >
        <button>{isCopy ? <BsCheck /> : <FaClipboard />}</button>
      </CopyToClipboard>

      <Highlight language={language}>
        {code}
        <div className='code-filename'>{filename}</div>
      </Highlight>
    </div>
  );
};

export default Code;
