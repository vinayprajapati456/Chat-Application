//already discussed regarding these libraries before...
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome({username}) {
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        {/* //adding elements or things required to show in welcome page... */}
        Welcome!
      </h1>
      {/* here too select a chat box to start convo... */}
      <h3>Select a chat box to start convo.</h3>
    </Container>
  );
}

//styling the welcome page...
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
