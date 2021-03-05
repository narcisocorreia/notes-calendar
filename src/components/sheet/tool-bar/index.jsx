import React from "react";
import styled from "styled-components";
import { RichUtils } from "draft-js";

import SizeSelector from "./size-selector";
import ColorSelector from "./color-selector";

const Container = styled.div`
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

  font-family: "Quicksand";

  background-color: transparent;
  border: none;

  color: #263135;
  font-size: 2rem;
`;

export const BLOCK_TYPES = [
  { label: "Pontos", style: "unordered-list-item" },
  { label: "Lista", style: "ordered-list-item" },
];

function ToolBar(ToolBarProps) {
  const { editorState, onChange } = ToolBarProps;

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

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  };
  return (
    <Container>
      <SizeSelector editorState={editorState} onChange={onChange} />
      <ColorSelector editorState={editorState} onChange={onChange} />

      {BLOCK_TYPES.map((type) => {
        return (
          <Button
            key={type.style}
            onClick={() => {
              toggleBlockType(type.style);
            }}
          >
            {type.label}
          </Button>
        );
      })}

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
    </Container>
  );
}

export default ToolBar;
