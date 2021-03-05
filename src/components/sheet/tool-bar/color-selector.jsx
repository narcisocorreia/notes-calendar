import React from "react";
import styled from "styled-components";
import { RichUtils } from "draft-js";

export const COLORS = [
  { label: "Red", style: "red" },
  { label: "Orange", style: "orange" },
  { label: "Yellow", style: "yellow" },
  { label: "Green", style: "green" },
  { label: "Blue", style: "blue" },
  { label: "Indigo", style: "indigo" },
  { label: "Violet", style: "violet" },
];

const Selector = styled.select`
  height: 80%;
  margin: 0.25em;

  font-family: "Times";

  background-color: #caf0f8;
  border-radius: 4px;

  border: none;
  padding: 1rem;
  color: #263135;
  font-size: 1.5rem;
  font-family: "Quicksand";
`;
const Option = styled.button`
  margin: 0.25em;

  font-family: "Times";

  background-color: #caf0f8;
  border-radius: 4px;

  border: none;
  padding: 1rem;
  color: #263135;
  font-size: 1.5rem;
  font-family: "Quicksand";
`;
function SizeSelector(SizeSelectorProps) {
  const { editorState, onChange } = SizeSelectorProps;

  const selection = editorState.getSelection();
  const [blockType, setBlockType] = React.useState(
    editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()
  );

  const onToggle = (event) => {
    let value = event.target.value;
    onChange(RichUtils.toggleInlineStyle(editorState, value));
    setBlockType(value);
  };

  return (
    <Option onClick={onToggle} value={COLORS[1].style}>
      {COLORS[1].label}
    </Option>
  );
}

export default SizeSelector;
