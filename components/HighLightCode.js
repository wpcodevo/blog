import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaClipboard } from "react-icons/fa";
import { BsCheck } from "react-icons/bs";
import theme from "prism-react-renderer/themes/nightOwl";
import Highlight, { defaultProps } from "prism-react-renderer";

const HighLightCode = ({ code, language, filename }) => {
  const [isCopy, setisCopy] = useState(false);

  return (
    <div className='code-block'>
      <CopyToClipboard
        text={code}
        className={`code-copy ${isCopy ? "color" : ""}`}
        onCopy={() => setisCopy(true)}
      >
        {isCopy ? <BsCheck /> : <FaClipboard />}
      </CopyToClipboard>

      <Highlight
        {...defaultProps}
        theme={theme}
        code={code}
        language={language}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            style={{
              ...style,
              maxHeight: "500px",
              width: "100%",
              backgroundColor: "#08090a",
              color: "#f8f8f2",
              padding: "10px",
              borderRadius: "10px",
              fontSize: "100%",
            }}
          >
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className='code-filename'>{filename}</div>
    </div>
  );
};

export default HighLightCode;
