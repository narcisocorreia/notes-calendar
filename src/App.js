import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "./components/calendar-component";
import Sheet from "./components/text-sheet";

const AppContainer = styled.div`
  background-color: #282c34;
  color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
`;
function App() {
  const [date, setDate] = useState(new Date());
  const onChange = (Date) => {
    setDate(Date);
  };

  return (
    <AppContainer>
      <Calendar onChange={onChange} date={date} />
      <Sheet date={date} />
    </AppContainer>
  );
}

export default App;
