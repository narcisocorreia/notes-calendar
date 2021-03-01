import React from "react";
import styled from "styled-components";
import { ReactComponent as WaterMark } from "../assets/svg/logo_narciso.svg";

const Container = styled.div`
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(1, 1fr);
  gap: 30px 30px;

  place-items: center;
`;

const LogoutButton = styled.button`
  color: #fff;
  font-size: 2.6rem;

  background-color: transparent;
  border-radius: 5%;
  border: none;

  grid-column: 11 / span 2;

  :hover {
    background-image: linear-gradient(315deg, #aecad6 0%, #b8d3fe 74%);
  }
`;

const AppTitle = styled.h1`
  color: #fff;
  font-size: 3rem;
  text-transform: uppercase;
  grid-column: 4 / span 6;
`;

const MyWaterMark = styled(WaterMark)`
  grid-column: 1 / span 1;
`;

function Header(HeaderProps) {
  const { onLogoutClick } = HeaderProps;
  return (
    <Container>
      <MyWaterMark width="100%" height="100%" />
      <AppTitle>Calendario</AppTitle>
      <LogoutButton onClick={onLogoutClick}>Sair</LogoutButton>
    </Container>
  );
}

export default Header;
