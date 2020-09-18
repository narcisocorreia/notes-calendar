import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "./components/calendar-component";
import Sheet from "./components/text-sheet";
import LoginForm from "./components/login-form";

const AppContainer = styled.div`
  background-color: greenyellow;
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
  const [hasUser, setHasUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChange = (Date) => {
    setDate(Date);
  };

  return (
    <AppContainer>
      {hasUser ? (
        <>
          <Calendar onChange={onChange} date={date} />
          <Sheet date={date} />{" "}
        </>
      ) : (
        <LoginForm loginCompleted={setHasUser} />
      )}
    </AppContainer>
  );
}

export default App;
