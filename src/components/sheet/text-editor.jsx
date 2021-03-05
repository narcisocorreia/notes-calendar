import React from "react";
import styled from "styled-components";
import { Editor, RichUtils } from "draft-js";
import ToolBar from "./tool-bar";

const Container = styled.div`
  grid-column: 1 / -1;
  grid-row: 2 / span 5;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 30px 30px;
`;

const EditorContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 1 / -1;

  margin-top: 5rem;
  padding: 0 1rem;

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

  return (
    <Container>
      <ToolBar editorState={editorState} onChange={onChange} />
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
