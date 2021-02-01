import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { getUserData } from "./firebase/firebase-actions";

import Calendar from "./components/calendar-component";
import Sheet from "./components/text-sheet";
import LoginForm from "./components/login-form";
import MessageManager from "./components/message-manager";
import { logout } from "./firebase/firebase-actions";

const GlobalStyle = createGlobalStyle`
  body {
  background-color: #63a4ff;
  background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);  
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  margin-right: 2rem;

  color: #fff;
  font-size: 26px;
  letter-spacing: 1px;

  background-color: #aecad6;
  background-image: linear-gradient(315deg, #aecad6 0%, #b8d3fe 74%);
  border: 2px solid white;
  border-radius: 5%;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  height: 90%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

  if (hasUser) {
    return (
      <AppContainer>
        <GlobalStyle />
        <Header>
          <Button onClick={logOutUser}>Logout</Button>
        </Header>
        <Body>
          <Calendar onChange={onChange} date={date} notes={notes} />
          <Sheet date={date} setMessage={setMessage} />
        </Body>
        {showMessage && (
          <MessageManager
            type={messageType}
            text={messageText}
            onExitClick={handleExit}
          />
        )}
      </AppContainer>
    );
  } else {
    return (
      <>
        <GlobalStyle />
        <LoginForm loginCompleted={setHasUser} />
      </>
    );
  }
}

export default App;
