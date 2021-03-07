import React from "react";
import styled from "styled-components";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import {
  pushData,
  uploadData,
  deleteData,
  getCurrentUser,
  getTodayData,
} from "../../firebase/firebase-actions";

import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../../store/app-reducer";

const Container = styled.div`
  grid-column: 7 / -1;
  grid-row: 2/ -1;
  padding: 2rem 1rem 0 0;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 30px 30px;

  & > .rdw-editor-wrapper {
    grid-column: 1 / -1;
    grid-row: 2 / span 5;

    padding: 0 1rem;

    & > .rdw-editor-toolbar {
      grid-column: 1 / -1;
      grid-row: 1;

      display: flex;
      place-content: center;
      background-color: #ececec59;
      border-radius: 4px;
      border: none;
      z-index: 1;

      & > div {
        margin: 0.25em;

        font-family: "Quicksand";

        background-color: transparent;
        border: none;

        color: #263135;

        & > div {
          max-width: 100%;
        }
      }
    }
    & > .rdw-editor-main {
      background-color: white;
      grid-row: 2 / span 5;

      overflow-y: auto;
      border-radius: 4px;
    }
  }
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

function Sheet() {
  const date = useSelector((state) => state.app.workingDay);

  const dispatch = useDispatch();

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

    setHasNote(false);
    setEditorState(EditorState.createEmpty());
  }, [date]);

  React.useEffect(() => {
    getTodayData(fullDate).then((result) => {
      const note = convertFromRaw(JSON.parse(result.data().note));
      setEditorState(EditorState.createWithContent(note));
      setDocID(result.id);
      setHasNote(true);
      SetTitle(result.data().titulo);
    });
  }, [fullDate]);

  React.useEffect(() => {
    const contentState = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    setText(contentState);
  }, [editorState]);

  const newCalendarNote = async () => {
    dispatch(setMessage("wait"));

    const newData = {
      userID: getCurrentUser().uid,
      date: fullDate,
      note: text,
      titulo: title,
    };

    try {
      await pushData(newData);
      setHasNote(true);
      dispatch(setMessage("success"));
    } catch (error) {
      dispatch(setMessage("failed"));
    }
  };

  const updateCalendarNote = async () => {
    dispatch(setMessage("wait"));

    try {
      await uploadData(text, docID);
      dispatch("success");
    } catch (error) {
      dispatch(setMessage("failed"));
    }
  };

  const deleteCalendarNote = async () => {
    dispatch(setMessage("wait"));

    try {
      await deleteData(docID);
      dispatch(setMessage("success"));
    } catch (error) {
      dispatch(setMessage("failed"));
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    SetTitle(value);
  };

  return (
    <Container>
      <Title type="text" value={title} onChange={handleTitleChange} />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        toolbar={{
          options: [
            "inline",
            "blockType",
            "fontSize",
            "list",
            "textAlign",
            "history",
            "colorPicker",
            "emoji",
          ],

          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
      />

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
