import React from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../assets/svg/ndc_logo.svg";

const Container = styled.div`
  grid-column: 1 / -1;
  height: 80%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 30px 30px;

  background-color: white;
  place-items: center;
  font-family: "Quicksand";

  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
`;

const LogoutButton = styled.button`
  color: white;
  font-size: 2rem;
  line-height: 2rem;

  background-color: #63a4ff;
  border-radius: 4px;
  border: none;

  width: 50%;
  height: 30%;

  grid-column: 11 / span 2;
  font-family: "Quicksand";
`;

const AppTitle = styled.h1`
  color: #232323;
  font-size: 3rem;
  text-transform: uppercase;
  grid-column: 4 / span 6;
`;

const DevLogo = styled(Logo)`
  grid-column: 1 / span 1;
`;

function Header(HeaderProps) {
  const { onLogoutClick } = HeaderProps;
  return (
    <Container>
      <DevLogo fill="#030b4f" width="100%" height="100%" />
      <AppTitle>Calendario</AppTitle>
      <LogoutButton onClick={onLogoutClick}>sair</LogoutButton>
    </Container>
  );
}

export default Header;
