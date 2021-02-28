import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Editor, RichUtils } from "draft-js";

const GlobalStyle = createGlobalStyle`
  body {
  background-color: #63a4ff;
  background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);  
  }
`;

const TextEditor = styled.div``;

const ToolBar = styled.div`
  display: flex;
  place-content: center;
`;

const Button = styled.button`
  border-radius: 2px;
  margin: 0.25em;
  width: 2.3em;
  font-family: "Times";
  line-height: 200%;
  border-radius: 3px;
  background-image: linear-gradient(-225deg, #fffeff 0%, white 100%);
  border: none;
  color: #263135;
`;

const EditorContainer = styled.div`
  background-color: white;
  max-height: 500px;
  height: 500px;

  overflow-y: auto;
  border: 1px transparent solid;
  padding: 1.5em 2em 2.75em 2em;
  margin: 1.25em;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  font-size: 100%;
  letter-spacing: 1.2px;
  border-radius: 6px;
  text-align: left;
  line-height: 1.5em;
  color: black;
`;

function NoteEditor(editorProps) {
  const { onChange, editorState } = editorProps;

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const onUnderlineClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const onBoldClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };

  const onStrikeThroughClick = () => {
    onChange(RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH"));
  };

  return (
    <>
      <GlobalStyle />
      <TextEditor>
        <ToolBar>
          <Button onClick={onUnderlineClick}>
            <ins>U</ins>
          </Button>
          <Button onClick={onBoldClick}>
            <b>B</b>
          </Button>
          <Button onClick={onItalicClick}>
            <em>I</em>
          </Button>
          <Button onClick={onStrikeThroughClick}>
            <del>abc</del>
          </Button>
        </ToolBar>

        <EditorContainer>
          <Editor
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
          />
        </EditorContainer>
      </TextEditor>
    </>
  );
}

export default NoteEditor;
