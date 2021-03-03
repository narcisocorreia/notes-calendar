import React from "react";
import styled from "styled-components";
import { Editor, RichUtils } from "draft-js";

const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 5;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 30px 30px;
`;

const ToolBar = styled.div`
  grid-column: 1 / -1;
  grid-row: 1;

  display: flex;
  place-content: center;
  background-color: #ececec59;
  border-radius: 4px;
  z-index: 1;
`;

const Button = styled.button`
  margin: 0.25em;

  font-family: "Times";

  background-color: transparent;
  border: none;

  color: #263135;
  font-size: 2rem;
`;

const EditorContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  margin-top: 6rem;

  background-color: white;
  border-radius: 4px;
  overflow-y: auto;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  font-size: 1rem;
  letter-spacing: 1.2px;
  line-height: 1.5em;
  color: black;
`;

function TextEditor(editorProps) {
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
    <Container>
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
    </Container>
  );
}

export default TextEditor;
