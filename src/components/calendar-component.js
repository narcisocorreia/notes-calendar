import React from "react";
import ReactCalendar from "react-calendar";
import styled from "styled-components";

import "react-calendar/dist/Calendar.css";
import NoteEntry from "./note-entry";

const CalendarComponent = styled(ReactCalendar)`
  width: 80%;
  height: 20rem;
  background-color: rgba(191, 191, 191, 0.2);
  border: none;
  border-radius: 15px;
`;

const Container = styled.div`
  width: 40%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-size: 50px;
`;

const ListOfDay = styled.div`
  width: 100%;
  margin-top: 20px;
  height: 22rem;
  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
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
