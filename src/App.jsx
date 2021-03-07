import React from "react";
import styled from "styled-components";

import Header from "./components/header";
import Sheet from "./components/sheet";
import Calendar from "./components/calendar";
import LoginForm from "./components/login-form";

import MessageManager from "./components/message-manager";

import { getUserData, logout } from "./firebase/firebase-actions";
import "./assets/fonts/fonts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setHasUser,
  setUserNotes,
  setMessage,
  hideMessage,
} from "./store/app-reducer";

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
  const dispatch = useDispatch();

  const hasUser = useSelector((state) => state.app.hasUser);
  const showMessage = useSelector((state) => state.app.showMessage);

  const getUserNotes = React.useCallback(async () => {
    dispatch(setMessage("wait"));
    try {
      const result = await getUserData();
      dispatch(setUserNotes(result));
      dispatch(hideMessage());
    } catch (error) {
      dispatch(setMessage("failed"));
    }
  }, [dispatch]);

  const logOutUser = () => {
    logout();
    dispatch(setHasUser());
  };

  React.useEffect(() => {
    if (hasUser) {
      getUserNotes();
    }
  }, [getUserNotes, hasUser]);

  if (hasUser) {
    return (
      <AppContainer>
        {showMessage && <MessageManager />}
        <Header onLogoutClick={logOutUser} />
        <Calendar />
        <Sheet />
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <LoginForm />
    </AppContainer>
  );
}

export default App;
