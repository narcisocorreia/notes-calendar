import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
  grid-column: 1/-1;
  grid-row: 1/-1;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 30px 30px;
`;

const Background = styled.div`
  grid-column: 4 / span 6;
  grid-row: 2 / span 4;
  place-self: center;
  border-radius: 25px;

  font-family: "Quicksand";

  width: 80%;
  height: 75%;
  background-color: white;

  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 30px 30px;
`;

const Title = styled.h1`
  grid-row: 1 / span 2;
  text-align: center;
  font-size: 4rem;
  place-self: center;
`;

const Message = styled.p`
  grid-row: 3 / span 2;
  font-weight: bold;
  font-size: 2rem;
  line-height: 2rem;
  place-self: center;

  background-color: white;
`;

const ExitBtn = styled.button`
  grid-row: 5 / span 2;
  color: white;
  font-size: 1.5rem;
  line-height: 2rem;

  background-color: #63a4ff;
  border-radius: 4px;
  border: none;

  width: 30%;
  height: 30%;

  place-self: center;
`;

const Success = styled(Title)`
  color: green;
`;

const Failed = styled(Title)`
  color: red;
`;

function MessageManager(messageProps) {
  const { type, onExitClick } = messageProps;

  if (type === "Wait") {
    return (
      <Container>
        <Background>
          <Message>Aguarde por favor.</Message>
        </Background>
      </Container>
    );
  }

  if (type === "failed") {
    return (
      <Container>
        <Background>
          <Failed>Erro</Failed>
          <Message>Ocorreu um erro inesperado.</Message>
          <ExitBtn onClick={onExitClick}>Continuar</ExitBtn>
        </Background>
      </Container>
    );
  }

  return (
    <Container>
      <Background>
        <Success>Sucesso</Success>
        <Message>Nota guardada com sucesso.</Message>
        <ExitBtn onClick={onExitClick}>Continuar</ExitBtn>
      </Background>
    </Container>
  );
}

export default MessageManager;
