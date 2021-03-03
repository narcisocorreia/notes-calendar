import React from "react";
import styled from "styled-components";

const EntryDays = styled.button`
  width: 90%;
  color: #fff;
  font-size: 2rem;
  line-height: 3rem;

  background-color: transparent;
  border-radius: 4px;
  border: none;
  outline: none;

  margin-top: 15px;
  font-family: "Quicksand";

  background-color: #63a4ff;
`;

function NoteEntry(entryProps) {
  const [title, SetTitle] = React.useState("");
  const { date, changeDayNotes } = entryProps;

  React.useEffect(() => {
    SetTitle(`${date.day}/${date.month + 1}/${date.year}`);
  }, [date]);

  const showNotes = () => {
    const newDate = new Date(date.year, date.month, date.day);
    changeDayNotes(newDate);
  };
  return <EntryDays onClick={showNotes}>{title}</EntryDays>;
}
export default NoteEntry;
