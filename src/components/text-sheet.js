import React from "react";
import styled from "styled-components";
import {
  pushData,
  getCurrentUser,
  getTodayData,
} from "../firebase/firebase-actions";

const TextArea = styled.textarea`
  width: 100%;
  height: 40rem;
  font-family: sans-serif;
`;
const Sheet = styled.div`
  width: 45%;
`;
const Title = styled.h1`
  text-align: center;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 24px 0;
`;
const Button = styled.button`
  border: none;
  outline: none;
  width: 40%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  background: #030b4f;
  cursor: pointer;
`;

function TextSheet(props) {
  const [title, SetTitle] = React.useState("");
  const [textArea, SetTextArea] = React.useState("");
  const [date, setDate] = React.useState({ day: "", month: "", year: "" });
  const [wasDayNote, SetWasDayNote] = React.useState(false);

  React.useEffect(() => {
    setDate({
      day: props.date.getDate(),
      month: props.date.getMonth(),
      year: props.date.getFullYear(),
    });

    SetTitle(
      `${props.date.getDate()} de ${props.date.toLocaleString("default", {
        month: "long",
      })}, ${props.date.getFullYear()}`
    );
  }, [props.date]);

  React.useEffect(() => {
    SetTextArea("");
    SetWasDayNote(false);
    getTodayData(date).then((result) => {
      SetTextArea(result.note);
    });
  }, [date]);

  const newCalendarNote = () => {
    const newData = {
      userID: getCurrentUser().uid,
      date: date,
      note: textArea,
    };
    pushData(newData).then((result) => {});
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
      {wasDayNote ?  <Button type="submit" onClick={newCalendarNote}>
          Alterar Nota
        </Button> :  <Button type="submit" onClick={newCalendarNote}>
          Guardar Nota
        </Button>}
        <Button type="submit" onClick={newCalendarNote}>
          Apagar
        </Button>
      </ButtonContainer>
    </Sheet>
  );
}

export default TextSheet;
