import React from "react";
import styled from "styled-components";

const EntryDays = styled.button`
  width: 100%;
  height: 50px;
  border: none;
  color: #fff;
  font-size: 20px;
  letter-spacing: 1px;

  background-color: transparent;

  :hover {
    background: #030b4f;
  }
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
