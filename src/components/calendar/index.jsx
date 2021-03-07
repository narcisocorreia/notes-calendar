import React from "react";
import styled from "styled-components";

import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import NoteEntry from "./note-entry";

import { useSelector, useDispatch } from "react-redux";
import { setNewDate } from "../../store/app-reducer";

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
  grid-row: 1 / span 3;

  place-self: center;
  height: fit-content;
  width: 100%;
  max-height: 100%;

  border: none;
  border-radius: 4px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);

  & > .react-calendar__navigation {
    height: 15%;
    & > button {
      font-size: 2rem;
      font-family: "Quicksand";
      text-transform: uppercase;
      color: #232323;
    }

    & > .react-calendar__navigation__label {
      color: #232323;
    }
  }

  & > .react-calendar__viewContainer {
    font-family: "Quicksand";
    padding: 0 0.5rem;
    max-width: 100%;

    & > .react-calendar__year-view {
      & > .react-calendar__year-view__months {
        & > button {
          font-size: 1rem;
          font-family: "Quicksand";
        }
      }
    }

    & > .react-calendar__decade-view {
      & > .react-calendar__decade-view__years {
        & > button {
          font-size: 1rem;
          font-family: "Quicksand";
        }
      }
    }

    & > .react-calendar__century-view {
      & > .react-calendar__century-view__decades {
        & > button {
          font-size: 1rem;
          font-family: "Quicksand";
        }
      }
    }

    & > .react-calendar__month-view {
      max-width: 100%;
      & > div {
        max-width: 100%;

        & > div {
          max-width: 100%;

          & > .react-calendar__month-view__weekdays {
            max-width: 100%;
            & > .react-calendar__month-view__weekdays__weekday {
              font-size: 1.2rem;
              & > abbr {
                text-decoration: none;
              }
            }
          }

          & > .react-calendar__month-view__days {
            max-width: 100%;

            & > button {
              max-width: 100%;

              font-size: 1.2rem;
              font-family: "Quicksand";
            }
            & > .react-calendar__tile--active:enabled:hover,
            .react-calendar__tile--active:enabled:focus {
              background: #030b4f;
              color: white;
            }
            & > .react-calendar__tile--now {
              background: #caf0f8;
              color: white;
            }
          }
        }
      }
    }
  }
`;

const ListPastNotes = styled.div`
  grid-column: 1 / -1;
  grid-row: 3 / -1;

  place-self: center;
  width: 100%;

  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  place-items: center;
  overflow: scroll;

  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

function Calendar() {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.app.userNotes);
  const date = useSelector((state) => state.app.workingDay);

  const onChange = (Date) => {
    dispatch(setNewDate(Date));
  };

  return (
    <Container>
      <StyledCalendar onChange={onChange} value={date} />

      <ListPastNotes>
        {notes.map((element, index) => {
          return (
            <NoteEntry
              date={element.date}
              changeDayNotes={onChange}
              key={index}
            />
          );
        })}
      </ListPastNotes>
    </Container>
  );
}

export default Calendar;
