import React from "react";
import styled, { keyframes } from "styled-components";
const LoadingAnim = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const StyledLoader = styled.div`
  display: inline-block;
  border: 4px solid ${props => props.secondary || "rgba(0, 0, 0, 0.1)"};
  border-left-color: ${props => props.primary || "#08415c"};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${LoadingAnim} 1.2s linear infinite;
`;
export const Loader = props => {
  return <StyledLoader {...props}>{props.children}</StyledLoader>;
};
export default Loader;
