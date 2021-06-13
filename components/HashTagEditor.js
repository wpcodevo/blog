import React, { useState } from "react";
import Editor, { createEditorStateWithText } from "@draft-js-plugins/editor";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import editorStyles from "./editorStyles.module.css";

const hashtagPlugin = createHashtagPlugin();
const plugins = [hashtagPlugin];
// const text = `#TIL: This editor can have all sorts of #hashtags. Pretty #cool :)
// Try it yourself by starting a word with a # (hash character) …
// `;

const HashTagEditor = (props) => {
  const [editorState, setEditorState] = useState(
    createEditorStateWithText(props.text)
  );

  const onChange = () => {
    setEditorState(editorState);
  };

  const focus = () => {
    props.editor.focus();
  };

  return (
    <div className='editor' onClick={focus}>
      <Editor
        editorState={editorState}
        onChange={onChange}
        plugins={plugins}
        ref={(element) => {
          props.editor = element;
        }}
      />
    </div>
  );
};

export default HashTagEditor;
