import React from "react";
import styled from "styled-components";
import {
  pushData,
  getCurrentUser,
  getData,
} from "../firebase/firebase-actions";

const TextArea = styled.textarea`
  width: 100%;
  height: 70%;
  stroke: 2rem solid red;
  font-family: sans-serif;
  resize: none;
`;
const Sheet = styled.div`
  width: 45%;
`;
const Title = styled.h1`
  text-align: center;
`;
const ButtonContainer = styled.div`
  width: 100%;
  padding: 24px 0;
`;
const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  background: #603bbb;
  cursor: pointer;
`;

function TextSheet(props) {
  const [title, SetTitle] = React.useState("");
  const [textArea, SetTextArea] = React.useState("");
  const [date, setDate] = React.useState("");
  React.useEffect(() => {
    setDate(
      `${props.date.getDate()}/${props.date.getMonth()}/${props.date.getFullYear()}`
    );
    SetTitle(
      `${props.date.getDate()} de ${props.date.toLocaleString("default", {
        month: "long",
      })}, ${props.date.getFullYear()}`
    );
  }, [props.date]);

  React.useEffect(() => {
    SetTextArea("");
    getData(date).then((result) => {
      SetTextArea(result.note);
    });
  }, [date]);

  const newCalendarNote = () => {
    const newData = {
      userID: getCurrentUser().uid,
      date: date,
      note: textArea,
    };
    pushData(newData).then((result) => {
      console.log(result);
    });
  };

  return (
    <Sheet>
      <Title>{title}</Title>
      <TextArea
        value={textArea}
        onChange={(e) => {
          SetTextArea(e.target.value);
        }}
      />
      <ButtonContainer>
        <Button type="submit" onClick={newCalendarNote}>
          Guardar Nota
        </Button>
      </ButtonContainer>
    </Sheet>
  );
}

export default TextSheet;
