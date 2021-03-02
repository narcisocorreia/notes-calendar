import React from "react";
import styled from "styled-components";

import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import NoteEntry from "./note-entry";

const Container = styled.div`
  grid-row: 2/-1;
  grid-column: 1 / span 6;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: 30px 30px;
  padding: 0 0 0 1rem;
`;

const StyledCalendar = styled(ReactCalendar)`
  grid-column: 1 / -1;
  width: 100%;

  background-color: transparent;
  border: none;
  border-radius: 15px;
`;

const ListOfDay = styled.div`
  grid-column: 2 / span 4;
  grid-row: 2 / span 3;

  flex-direction: column;
  align-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

function Calendar(CalendarProps) {
  const { notes, date, onChange } = CalendarProps;

  return (
    <Container>
      <StyledCalendar onChange={onChange} value={date} />

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
