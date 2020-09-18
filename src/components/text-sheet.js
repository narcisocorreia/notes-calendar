import React, { useState } from "react";
import styled from "styled-components";

const TextArea = styled.textarea`
  width: 100%;
  height: 80%;
  stroke: 2rem solid red;
  font-family: sans-serif;
`;

const Sheet = styled.div`
  width: 45%;
`;

const Title = styled.h1`
  text-align: center;
`;

function TextSheet(props) {
  const [title, SetTitle] = useState("");
  const date = props.date;

  React.useEffect(() => {
    console.log(date);
    SetTitle(
      `${date.getDate()} de ${date.toLocaleString("default", {
        month: "long",
      })}, ${date.getFullYear()}`
    );
  }, [date]);
  return (
    <Sheet>
      <Title>{title}</Title>
      <TextArea />
    </Sheet>
  );
}

export default TextSheet;
