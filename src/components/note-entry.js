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
  border: 5px solid white;
  outline:none;

  margin-top: 15px;

  :hover {
    background-color: #63a4ff;
    background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
    border: 2px solid white;
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
