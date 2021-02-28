import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  left: 0;
  top: 0;
  position: absolute;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Message = styled.button`
  position: absolute;
  width: 50%;
  height: 25%;
  border-radius: 25px;
  color: white;
  font-size: 35px;
`;

const ExitBtn = styled.span`
  font-weight: bold;
  font-size: 44px;
  line-height: 20px;

  position: absolute;
  top: 20px;
  right: 20px;
`;

const Success = styled(Message)`
  background-color: #7ee8fa;
  background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
`;
const Wait = styled(Message)`
  background-color: #abe9cd;
  background-image: linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%);
`;
const Failed = styled(Message)`
  background-color: #f9c1b1;
  background-image: linear-gradient(315deg, #f9c1b1 0%, #fb8085 74%);
`;

function MessageManager(messageProps) {
  const { type, text, onExitClick } = messageProps;
  return (
    <Container>
      {type === "success" && (
        <Success>
          {text}
          <ExitBtn onClick={onExitClick}>&times;</ExitBtn>
        </Success>
      )}
      {type === "failed" && (
        <Failed>
          {text}
          <ExitBtn onClick={onExitClick}>&times;</ExitBtn>
        </Failed>
      )}
      {type === "wait" && (
        <Wait>
          {text}
          <ExitBtn onClick={onExitClick}>&times;</ExitBtn>
        </Wait>
      )}
    </Container>
  );
}

export default MessageManager;
