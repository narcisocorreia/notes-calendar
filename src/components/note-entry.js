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
function NoteEntry(prop) {
  const [title, SetTitle] = React.useState("");

  React.useEffect(() => {
    SetTitle(`${prop.date.day}/${prop.date.month + 1}/${prop.date.year}`);
  }, []);

  const showNotes = () => {
    const date = new Date(prop.date.year, prop.date.month, prop.date.day);
    prop.changeDayNotes(date);
  };
  return <EntryDays onClick={showNotes}>{title}</EntryDays>;
}
export default NoteEntry;
