import React from "react";
import styled from "styled-components";
import {
  pushData,
  uploadData,
  deleteData,
  getCurrentUser,
  getTodayData,
} from "../firebase/firebase-actions";

const TextArea = styled.textarea`
  width: 100%;
  height: 40rem;
  font-family: sans-serif;
  outline: none;
  font-size: 28px;
  resize: none;
`;
const Sheet = styled.div`
  width: 45%;
`;
const Title = styled.input`
  text-align: center;
  color: white;
  background-color: transparent;
  border: none;
  width: 100%;
  font-size: 30px;
  outline: none;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  padding: 24px 0;
`;
const Button = styled.button`
  width: 40%;
  padding: 15px 0;
  color: #fff;
  font-size: 25px;
  letter-spacing: 1px;
  cursor: pointer;
  background-color:transparent;
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
  const [textArea, SetTextArea] = React.useState("");
  const [fullDate, setFullDate] = React.useState({ day: "", month: "", year: "" });
  const [wasDayNote, SetWasDayNote] = React.useState(false);
  const [docID, setDocID] = React.useState('');

  const { date, setMessage } = sheetProps;

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
    SetTextArea("");
    SetWasDayNote(false);
    getTodayData(fullDate).then((result) => {
      SetTextArea(result.data().note);
      setDocID(result.id)
      SetWasDayNote(true);
      SetTitle(result.data().titulo);
    });
  }, [fullDate]);

  const newCalendarNote = () => {
    setMessage('wait', 'Aguarde por favor');
    const newData = {
      userID: getCurrentUser().uid,
      date: fullDate,
      note: textArea,
      titulo: title,
    };
    pushData(newData).then((result) => {
      setMessage('success', 'A nova nota foi guardada');
      SetWasDayNote(true)
    });
  };

  const updateCalendarNote = () => {
    setMessage('wait', 'Aguarde por favor');
    console.log(docID);
    uploadData(textArea, docID).then((result) => {
      setMessage('success', 'A nota foi alterada');
    });
  };

  const deleteCalendarNote = () => {
    setMessage('wait', 'Aguarde por favor');
    deleteData(docID).then((result) => {
      SetTextArea("");
      SetWasDayNote(false)
      setMessage('success', 'A nota foi apagada');
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    SetTitle(value);
  };


  return (
    <Sheet>
      <Title
        type="text"
        value={title}
        id="email"
        onChange={handleChange}/>
      <TextArea
        value={textArea}
        onChange={(e) => {
          SetTextArea(e.target.value);
        }}
      />
      <ButtonContainer>
      {!wasDayNote && <Button type="submit" onClick={newCalendarNote}>Guardar Nota</Button>}
        {wasDayNote && (<>
          <Button type="submit" onClick={updateCalendarNote}>
            Alterar Nota
          </Button>
          <Button type="submit" onClick={deleteCalendarNote}>
            Apagar
          </Button>
        </>)}
      </ButtonContainer>
    </Sheet>
  );
}

export default TextSheet;
