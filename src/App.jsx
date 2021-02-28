import React from "react";
import styled from "styled-components";

import Header from "./components/header";
import Sheet from "./components/sheet";
import Calendar from "./components/calendar";
import LoginForm from "./components/login-form";

import MessageManager from "./components/message-manager";

import { getUserData, logout } from "./firebase/firebase-actions";

const AppContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 30px 30px;
  height: 100vh;
  background-color: #63a4ff;
  background-image: linear-gradient(315deg, #63a4ff 0%, #83eaf1 74%);
`;

function App() {
  const [hasUser, setHasUser] = React.useState(false);
  const [showMessage, setShowMessage] = React.useState(false);

  const [messageInfo, setMessageInfo] = React.useState({
    type: "",
    text: "",
  });

  const [notes, setNotes] = React.useState([]);

  const [date, setDate] = React.useState(new Date());

  const setMessage = (messageType, text) => {
    setMessageInfo({
      type: messageType,
      text: text,
    });

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
        <Header onLogoutClick={logOutUser} />
        <Sheet date={date} setMessage={setMessage} />
        <Calendar onChange={onChange} date={date} notes={notes} />

        {showMessage && (
          <MessageManager
            type={messageInfo.type}
            text={messageInfo.text}
            onExitClick={handleExit}
          />
        )}
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <LoginForm loginCompleted={setHasUser} />
    </AppContainer>
  );
}

export default App;
