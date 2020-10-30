import React from 'react'
import styled from "styled-components";

const Message = styled.button`
  position: absolute;
  width: 60%;
  height: 21%;
  border: none;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  font-size: 35px;
`;

const ExitBtn = styled.span`
  font-weight: bold;
  font-size: 44px;
  line-height: 20px;

  position:absolute;
  top: 20px;
  right:20px;
`;


const Success= styled(Message)`  
  background-color: #f44336;
`
const Wait = styled(Message)`  
  background-color: #2196F3;
`
const Failed = styled(Message)`  
  background-color: #4CAF50;
`

function MessageManager(messageProps) {
    const { type, text, onExitClick} = messageProps;
    return ( 
        <>
            {type === 'success' &&
                <Success >
                    {text}
                    <ExitBtn onClick = {onExitClick}>&times;</ExitBtn>
                </Success>
            }
            {type === 'failed' && 
                <Failed >
                    {text}
                    <ExitBtn onClick = {onExitClick}>&times;</ExitBtn>
                </Failed>
            }
            {type === 'wait' &&
                <Wait >
                    {text}
                    <ExitBtn onClick = {onExitClick}>&times;</ExitBtn>
                </Wait>
            }
        </>
    )
}

export default MessageManager;