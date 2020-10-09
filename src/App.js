import React, { useState } from "react";
import styled from "styled-components";

import Calendar from "./components/calendar-component";
import Sheet from "./components/text-sheet";
import LoginForm from "./components/login-form";
import { logout } from "./firebase/firebase-actions";

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
const CalendarContainer = styled.div`
  color: white;
  background-color: #00b4d8;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding-top: 60px;
`;

const Button = styled.button`
  position: absolute;
  top: 5px;
  left: 20px;

  width: 150px;
  height: 50px;
  border: none;
  border-radius: 5%;

  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;

  background-color: transparent;

  :hover {
    background: #0077b6;
  }
`;

function App() {
  const [hasUser, setHasUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const onChange = (Date) => {
    setDate(Date);
  };

  const logOutUser = () => {
    setHasUser(false);
    logout();
  };

  return (
    <AppContainer>
      {hasUser ? (
        <CalendarContainer>
          <Calendar onChange={onChange} date={date} />
          <Sheet date={date} />
          <Button onClick={logOutUser}>LogOut</Button>
        </CalendarContainer>
      ) : (
        <LoginForm loginCompleted={setHasUser} />
      )}
    </AppContainer>
  );
}

export default App;
