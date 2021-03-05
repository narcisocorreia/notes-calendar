import React from "react";
import styled from "styled-components";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

import TextEditor from "./text-editor";

import {
  pushData,
  uploadData,
  deleteData,
  getCurrentUser,
  getTodayData,
} from "../../firebase/firebase-actions";

const Container = styled.div`
  grid-column: 7 / -1;
  grid-row: 2/ -1;
  padding: 2rem 1rem 0 0;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 30px 30px;
`;

const Title = styled.input`
  grid-column: 1 / -1;
  grid-row: 1;

  color: white;
  font-size: 3rem;
  text-align: center;

  border: none;
  outline: none;
  background-color: transparent;
  font-family: "Quicksand";
`;

const ButtonContainer = styled.div`
  grid-column: 1 / -1;
  grid-row: 7 / span 2;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const Button = styled.button`
  width: 40%;
  height: 50%;

  padding: 15px 0;
  color: #fff;
  font-size: 2rem;
  letter-spacing: 1px;
  cursor: pointer;

  border: none;
  border-radius: 4px;

  background-color: #63a4ff;
  font-family: "Quicksand";
`;

function Sheet(SheetProps) {
  const { date, setMessage } = SheetProps;

  const [text, setText] = React.useState("");
  const [title, SetTitle] = React.useState("");
  const [docID, setDocID] = React.useState("");

  const [hasNote, setHasNote] = React.useState(false);

  const [fullDate, setFullDate] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  React.useEffect(() => {
    setHasNote(false);
    setEditorState(EditorState.createEmpty());

    getTodayData(fullDate).then((result) => {
      const note = convertFromRaw(JSON.parse(result.data().note));
      setEditorState(EditorState.createWithContent(note));
      setDocID(result.id);
      setHasNote(true);
      SetTitle(result.data().titulo);
    });
  }, [fullDate]);

  React.useEffect(() => {
    setFullDate({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    });

    SetTitle(
      `${date.getDate()} de ${date.toLocaleString("default", {
        month: "long",
      })}, ${date.getFullYear()}`
    );
  }, [date]);

  React.useEffect(() => {
    const contentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setText(contentState);
  }, [editorState]);

  const newCalendarNote = () => {
    setMessage("wait");
    const newData = {
      userID: getCurrentUser().uid,
      date: fullDate,
      note: text,
      titulo: title,
    };

    pushData(newData).then((result) => {
      setHasNote(true);
      setMessage("success");
    });
  };

  const updateCalendarNote = () => {
    setMessage("wait");
    uploadData(text, docID).then((result) => {
      setMessage("success");
    });
  };

  const deleteCalendarNote = () => {
    setMessage("wait");
    deleteData(docID).then((result) => {
      setHasNote(false);
      setMessage("success");
    });
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    SetTitle(value);
  };

  return (
    <Container>
      <Title type="text" value={title} onChange={handleTitleChange} />
      <TextEditor editorState={editorState} onChange={setEditorState} />
      <ButtonContainer>
        {hasNote ? (
          <>
            <Button type="submit" onClick={updateCalendarNote}>
              Alterar Nota
            </Button>
            <Button type="submit" onClick={deleteCalendarNote}>
              Apagar
            </Button>
          </>
        ) : (
          <Button type="submit" onClick={newCalendarNote}>
            Guardar Nota
          </Button>
        )}
      </ButtonContainer>
    </Container>
  );
}

export default Sheet;
