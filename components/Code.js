import { useState } from "react";
import Highlight from "react-highlight";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard, FaRegCopy } from "react-icons/fa";

const Code = ({ language, filename, code }) => {
  const [isCopy, setisCopy] = useState(false);

  return (
    <div className='code-block'>
      <CopyToClipboard
        text={code}
        className='code-copy'
        onCopy={() => setisCopy(true)}
      >
        <button>{isCopy ? <FaClipboard /> : <FaRegCopy />}</button>
      </CopyToClipboard>

      <Highlight language={language}>
        {code}
        <div className='code-filename'>{filename}</div>
      </Highlight>
    </div>
  );
};

export default Code;
