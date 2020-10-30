import React from "react";
import styled from "styled-components";
import { createNewUser, login } from "../firebase/firebase-actions";

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
  padding: 0 20px;
  background-color: #caf0f8;
  display: flex;
`;
const InputContainer = styled.div`
  padding: 60px;
  margin: auto;
  width: 100%;
  max-width: 520px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: radial-gradient(
    ellipse at left bottom,
    #030b4f 0%,
    #101174 59%,
    #03005e 100%
  );
  box-shadow: 0 50px 70px -20px rgba(0, 0, 0, 0.8);
`;
const ButtonContainer = styled.div`
  width: 100%;
  padding: 24px 0;
`;
const Title = styled.h1`
  text-align: center;
  color: white;
  display: block;
  font-size: 36px;
  line-height: 1;
`;
const Label = styled.label`
  color: white;
  margin: 14px 0;
  display: block;
  font-size: 22px;
  line-height: 1;
`;
const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 19px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  letter-spacing: 1px;
`;
const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
`;
const InfoMessage = styled.p`
  margin: 14px 0 0 0;
  text-align: right;
  color: #fff;
`;
const InfoMessageSpan = styled.span`
  color: #caf0f8;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-left: 5px;
  cursor: pointer;
  transition: all 400ms ease-in-out;
`;
const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  background: #00b4d8;
  cursor: pointer;
  :hover {
    background: #90e0ef;
  }
`;

function LoginForm(loginProps) {
  const [userInfo, setUserInfo] = React.useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    email: "",
    password: "",
  });
  const [hasAccount, setHasAccount] = React.useState(true);

  const { loginCompleted } = loginProps;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const clearError = () => {
    setErrorMessage({
      email: "",
      password: "",
    });
  };

  const clearUser = () => {
    setUserInfo({
      email: "",
      password: "",
    });
  };

  const handleLogin = () => {
    clearError();

    login(userInfo.email, userInfo.password)
      .then(() => {
        loginCompleted(true);
      })
      .catch((err) => {
        // eslint-disable-next-line default-case
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setErrorMessage({ ...errorMessage, email: err.message });
            break;
          case "auth/wrong-password":
            setErrorMessage({ ...errorMessage, password: err.message });
            break;
        }
      });
  };

  const createUser = () => {
    clearError(hasAccount);
    createNewUser(userInfo.email, userInfo.password)
      .then(() => {
        setHasAccount(true);
        clearUser();
      })
      .catch((err) => {
        // eslint-disable-next-line default-case
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setErrorMessage({ ...errorMessage, email: err.message });
            break;
          case "auth/weak-password":
            setErrorMessage({ ...errorMessage, password: err.message });
            break;
        }
      });
  };

  return (
    <Container>
      <InputContainer>
        {hasAccount ? (
          <Title>Entrar no calendario</Title>
        ) : (
          <Title>Criar nova conta</Title>
        )}
        <Label>Email</Label>
        <Input
          type="text"
          autoFocus
          required
          value={userInfo.email}
          id="email"
          onChange={handleChange}
        />
        <ErrorMessage>{errorMessage.email}</ErrorMessage>
        <Label>Password</Label>
        <Input
          type="password"
          required
          value={userInfo.password}
          id="password"
          onChange={handleChange}
        />
        <ErrorMessage>{errorMessage.password}</ErrorMessage>
        <ButtonContainer>
          {hasAccount ? (
            <>
              <Button onClick={handleLogin}>Entrar</Button>
              <InfoMessage>
                Não tem conta ?{" "}
                <InfoMessageSpan
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  Crie uma.
                </InfoMessageSpan>
              </InfoMessage>
            </>
          ) : (
            <>
              <Button onClick={createUser}>Criar</Button>
              <InfoMessage>
                Ja tem conta ?{" "}
                <InfoMessageSpan
                  onClick={() => {
                    setHasAccount(!hasAccount);
                  }}
                >
                  Usar conta.
                </InfoMessageSpan>
              </InfoMessage>
            </>
          )}
        </ButtonContainer>
      </InputContainer>
    </Container>
  );
}

export default LoginForm;
