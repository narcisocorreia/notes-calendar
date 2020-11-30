import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";
import NoteEntry from "./note-entry";

const CalendarComponent = styled(ReactCalendar)`
  width: 60%;
  height: 20rem;
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
  overflow: hidden;
`;

function Calendar(calendarProps) {
  const { notes, date, onChange } = calendarProps;
  return (
    <Container>
      <Title>Calendario</Title>
      <CalendarComponent onChange={onChange} value={date} />
      <ListOfDay>
        {notes.map((element, index) => {
          return (
            <NoteEntry
              date={element.date}
              changeDayNotes={onChange}
              key={index}
            />
          );
        })}
      </ListOfDay>
    </Container>
  );
}
export default Calendar;
