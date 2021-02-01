import React from "react";
import styled from "styled-components";
import {
  pushData,
  uploadData,
  deleteData,
  getCurrentUser,
  getTodayData,
} from "../firebase/firebase-actions";

import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Sheet = styled.div`
  width: 55%;
  height: 90%;
  display: flex;
  flex-direction: column;
  margin-right: 1.5rem;
`;

const Title = styled.input`
  text-align: center;
  color: white;
  background-color: transparent;
  border: none;
  width: 100%;
  font-size: 50px;
  outline: none;
`;

const TextEditor = styled.div`
  color: black;
  height: 100%;
  width: 100%;
  color: black;
  overflow-y: auto;

  .rdw-editor-toolbar {
    background-color: rgba(191, 191, 191, 0.4);
    border: none;
    justify-content: center;
    border-radius: 15px;
  }
  .DraftEditor-root {
    background-color: white;
    min-height: 10rem;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-content: space-evenly;
  padding: 10px 0;
`;

const Button = styled.button`
  width: 40%;
  padding: 15px 0;
  color: #fff;
  font-size: 25px;
  letter-spacing: 1px;
  cursor: pointer;
  background-color: transparent;
  border: 5px solid white;
  outline: none;

  :hover {
    background-color: #63a4ff;
    background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
    border: 2px solid white;
  }
`;

function TextSheet(sheetProps) {
  const [title, SetTitle] = React.useState("");
  const [text, setText] = React.useState("");

  const [fullDate, setFullDate] = React.useState({
    day: "",
    month: "",
    year: "",
  });

  const [wasDayNote, SetWasDayNote] = React.useState(false);
  const [docID, setDocID] = React.useState("");

  const { date, setMessage } = sheetProps;

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

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
    SetWasDayNote(false);
    getTodayData(fullDate).then((result) => {
      const note = convertFromRaw(JSON.parse(result.data().note));
      setEditorState(EditorState.createWithContent(note));
      setDocID(result.id);
      SetWasDayNote(true);
      SetTitle(result.data().titulo);
    });
  }, [fullDate]);

  const newCalendarNote = () => {
    setMessage("wait", "Aguarde por favor");
    const newData = {
      userID: getCurrentUser().uid,
      date: fullDate,
      note: text,
      titulo: title,
    };
    pushData(newData).then((result) => {
      setMessage("success", "A nova nota foi guardada");
      SetWasDayNote(true);
    });
  };

  const updateCalendarNote = () => {
    setMessage("wait", "Aguarde por favor");
    uploadData(text, docID).then((result) => {
      setMessage("success", "A nota foi alterada");
    });
  };

  const deleteCalendarNote = () => {
    setMessage("wait", "Aguarde por favor");
    deleteData(docID).then((result) => {
      SetWasDayNote(false);
      setMessage("success", "A nota foi apagada");
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    SetTitle(value);
  };

  React.useEffect(() => {
    const contentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setText(contentState);
  }, [editorState]);

  return (
    <Sheet>
      <Title type="text" value={title} id="email" onChange={handleChange} />
      <TextEditor>
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </TextEditor>
      <ButtonContainer>
        {!wasDayNote && (
          <Button type="submit" onClick={newCalendarNote}>
            Guardar Nota
          </Button>
        )}
        {wasDayNote && (
          <>
            <Button type="submit" onClick={updateCalendarNote}>
              Alterar Nota
            </Button>
            <Button type="submit" onClick={deleteCalendarNote}>
              Apagar
            </Button>
          </>
        )}
      </ButtonContainer>
    </Sheet>
  );
}

export default TextSheet;
