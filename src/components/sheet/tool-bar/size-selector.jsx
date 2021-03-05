import React from "react";
import styled from "styled-components";
import { RichUtils } from "draft-js";

export const HEADER_TYPES = [
  { label: "Titulo", style: "header-one" },
  { label: "SubTitulo", style: "header-two" },
  { label: "Paragrafo", style: "paragraph" },
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
const Option = styled.option`
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
    console.log(value);

    onChange(RichUtils.toggleBlockType(editorState, value));
    setBlockType(value);
  };

  return (
    <Selector value={blockType} onChange={onToggle}>
      <Option value="">Tipo de texto</Option>
      {HEADER_TYPES.map((heading) => {
        return (
          <Option key={heading.style} value={heading.style}>
            {heading.label}
          </Option>
        );
      })}
    </Selector>
  );
}

export default SizeSelector;
