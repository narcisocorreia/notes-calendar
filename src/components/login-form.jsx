import React from "react";
import styled from "styled-components";
import { createNewUser, login } from "../firebase/firebase-actions";

const Container = styled.div`
  grid-column: 4 / span 6;
  grid-row: 2 / span 4;
  place-self: center;

  width: 85%;
  height: 90%;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(8, 1fr);
  gap: 30px 30px;

  place-items: center;

  border-radius: 25px;
  background-color: white;
  box-shadow: 0 0 50px 0 rgba(0, 0, 0, 0.15);

  font-family: "Quicksand";
`;

const Title = styled.h1`
  grid-row: 1 / span 2;
  text-align: center;
  color: #232323;
  font-size: 36px;
  place-self: end center;
`;

const Label = styled.label`
  color: #232323;
  margin: 14px 0;
  display: block;
  font-size: 1.5rem;
  line-height: 1;
`;

const InputContainer = styled.div`
  grid-row: ${(props) => `${props.col} / span 2`};
  place-self: ${(props) => `${props.placeSelf} center`};
  width: 85%;
`;

const Input = styled.input`
  border: none;
  outline: none;
  padding: 20px;
  border-radius: 4px;
  background: #ececec;

  width: 100%;
  box-sizing: border-box;

  color: #232323;
  font-size: 1.3rem;
  font-family: "Quicksand";
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 16px;
`;

const InputComponent = (props) => {
  return (
    <InputContainer placeSelf={props.placeSelf} col={props.col}>
      <Label>{props.label}</Label>
      <Input
        type={props.type}
        autoFocus
        required
        value={props.value}
        id={props.id}
        onChange={props.handleChange}
      />
      <ErrorMessage>{props.errorMessage}</ErrorMessage>
    </InputContainer>
  );
};

const ButtonContainer = styled.div`
  grid-row: 7 / -1;
  place-self: center;
  width: 80%;
`;

const Button = styled.button`
  border: none;
  outline: none;
  width: 100%;
  padding: 15px 0;
  color: #fff;
  font-size: 16px;
  letter-spacing: 1px;
  border-radius: 4px;
  background-color: #63a4ff;
  cursor: pointer;
  font-family: "Quicksand";
`;

const InfoMessage = styled.p`
  margin: 14px 0 0 0;
  text-align: right;
  color: #232323;
`;

const InfoMessageSpan = styled.span`
  color: #90e0ef;
  letter-spacing: 0.5px;
  margin-left: 5px;
  cursor: pointer;
  transition: all 400ms ease-in-out;
  font-style: oblique;
  font-family: "Quicksand-SemiBold";
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

  const [createNewAccount, setCreateNewAccount] = React.useState(false);

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
    clearError(createNewAccount);
    createNewUser(userInfo.email, userInfo.password)
      .then(() => {
        setCreateNewAccount(true);
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

  if (createNewAccount) {
    return (
      <Container>
        <Title>Criar nova conta</Title>

        <InputComponent
          type="text"
          handleChange={handleChange}
          value={userInfo.email}
          id="email"
          errorMessage={errorMessage.email}
          label="Email"
          placeSelf="end"
          col="3"
        />

        <InputComponent
          type="password"
          handleChange={handleChange}
          value={userInfo.password}
          id="password"
          errorMessage={errorMessage.password}
          label="Password"
          placeSelf="start"
          col="5"
        />

        <ButtonContainer>
          <Button onClick={createUser}>Criar</Button>
          <InfoMessage>
            Ja tem conta ?
            <InfoMessageSpan
              onClick={() => {
                setCreateNewAccount(false);
              }}
            >
              Usar conta.
            </InfoMessageSpan>
          </InfoMessage>
        </ButtonContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Login</Title>
      <InputComponent
        type="text"
        handleChange={handleChange}
        value={userInfo.email}
        id="email"
        errorMessage={errorMessage.email}
        label="Email"
        placeSelf="end"
        col="3"
      />

      <InputComponent
        type="password"
        handleChange={handleChange}
        value={userInfo.password}
        id="password"
        errorMessage={errorMessage.password}
        label="Password"
        placeSelf="start"
        col="5"
      />

      <ButtonContainer>
        <Button onClick={handleLogin}>Entrar</Button>
        <InfoMessage>
          Não tem conta ?
          <InfoMessageSpan
            onClick={() => {
              setCreateNewAccount(true);
            }}
          >
            Crie uma.
          </InfoMessageSpan>
        </InfoMessage>
      </ButtonContainer>
    </Container>
  );
}

export default LoginForm;
