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
  background-color: white;
  grid-column: 1 / -1;
  grid-row: 2 / -1;

  overflow-y: auto;
  border: 1px transparent solid;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  font-size: 100%;
  letter-spacing: 1.2px;
  border-radius: 6px;
  text-align: left;
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
