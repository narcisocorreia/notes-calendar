import React, { useState } from "react";
import styled from "styled-components";
import { getUserData } from "./firebase/firebase-actions";

import Calendar from "./components/calendar-component";
import Sheet from "./components/text-sheet";
import LoginForm from "./components/login-form";
import MessageManager from "./components/message-manager";
import { logout } from "./firebase/firebase-actions";

const AppContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  background-color: #63a4ff;
  background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
`;

const CalendarContainer = styled.div`
  color: white;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding-top: 60px;
`;

const Button = styled.button`
  position: absolute;
  top: 30px;
  right: 20px;

  width: 150px;
  height: 50px;

  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;

  background-color: #aecad6;
  background-image: linear-gradient(315deg, #aecad6 0%, #b8d3fe 74%);
  border: 2px solid white;
  border-radius: 5%;
`;

function App() {
  const [hasUser, setHasUser] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageText, setMessageText] = useState("");
  const [notes, setNotes] = React.useState([]);

  const setMessage = (messageType, text) => {
    setMessageType(messageType);
    setMessageText(text);
    setShowMessage(true);
  };

  const getUserNotes = React.useCallback(() => {
    getUserData().then((result) => {
      setNotes(result);
      console.log(result);
    });
    setDate(date);
  }, [date]);

  const handleExit = () => {
    setShowMessage(false);
    getUserNotes();
  };

  const onChange = (Date) => {
    setDate(Date);
  };

  const logOutUser = () => {
    setHasUser(false);
    logout();
  };

  React.useEffect(() => {
    if (hasUser) {
      getUserNotes();
    }
  }, [getUserNotes, hasUser]);

  return (
    <AppContainer>
      {hasUser ? (
        <>
          <Button onClick={logOutUser}>Logout</Button>
          <CalendarContainer>
            <Calendar onChange={onChange} date={date} notes={notes} />
            <Sheet date={date} setMessage={setMessage} />
            {showMessage && (
              <MessageManager
                type={messageType}
                text={messageText}
                onExitClick={handleExit}
              />
            )}
          </CalendarContainer>
        </>
      ) : (
        <LoginForm loginCompleted={setHasUser} />
      )}
    </AppContainer>
  );
}

export default App;
