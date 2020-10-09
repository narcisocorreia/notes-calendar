import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";
import { getUserData } from "../firebase/firebase-actions";
import NoteEntry from "./note-entry";
const CalendarComponent = styled(ReactCalendar)`
  width: 60%;
  height: 20rem;
  border-radius: 3%;
`;
const Container = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const ListOfDay = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 30rem;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
`;

function Calendar(prop) {
  const [notes, setNotes] = React.useState([]);
  const [selectDay, setSelectDay] = React.useState();

  React.useEffect(() => {
    getUserData().then((result) => {
      setNotes(result);
    });
    setSelectDay(prop.date);
  }, []);

  return (
    <Container>
      <Title>Calendario</Title>
      <CalendarComponent onChange={prop.onChange} value={selectDay} />
      <ListOfDay>
        {notes.map((element) => {
          return (
            <NoteEntry date={element.date} changeDayNotes={prop.onChange} />
          );
        })}
      </ListOfDay>
    </Container>
  );
}
export default Calendar;
