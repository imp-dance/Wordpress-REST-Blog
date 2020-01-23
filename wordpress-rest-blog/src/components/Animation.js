import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
const LaptopScreenAnimation = keyframes`
  from {
    transform: rotateX(-90deg) scale(1.1);
  }
  50%{
    transform: rotateX(-90deg) scale(1.1);
  }
`;
const MobileScreenAnimation = keyframes`
  from {
    transform: rotate(22deg) translate(20px, 20px);
    opacity:0;
  }
  50% {
    transform: rotate(0deg) translate(0px, 0px);
    opacity:0;
  }
`;
const LaptopScreen = styled.div`
  transition: transform 2s ease-out;
  animation: ${LaptopScreenAnimation} 2s ease-out;
  animation-fill-mode: forwards;
  transform-origin: bottom;
  display: flex;
  margin: 50px 0 0;
  height: 300px;
  background: #eee;
  border: 15px solid #333;
  border-radius: 10px;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  justify-content: center;
  align-items: center;
  @media (prefers-color-scheme: dark) {
    background: #1d1d29;
    border-color: #ccc;
  }
  @media screen and (max-width: 620px) {
    border-radius: 10px !important;
  }
  @media screen and (max-width: 520px) {
    animation: ${MobileScreenAnimation} 1.2s ease-out;
    animation-delay: 0s;
  }
  @media screen and (max-width: 500px) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  @media screen and (max-width: 400px) {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 250px;
  }
  @media screen and (max-width: 310px) {
    border-width: 7px;
  }
  &.closed {
    animation: none;
    transition: transform 2s ease-out;
    transform: rotateX(-90deg) scale(1.1);
  }
`;
const LaptopAnimation = keyframes`
  from{
    transform:translate(0px, -10px);
    opacity:0;
  }
  60%{
    transform:translate(0px, -10px);
    opacity:0;
  }
  90%{
    opacity:0;
  }
`;
const Laptop = styled.div`
  animation: ${LaptopAnimation} 1s ease-in-out;
  width: 100%;
  max-width: 500px;
  margin: 100px auto 70px;
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
`;
const LaptopKeyboard = styled.div`
  height: 15px;
  background: #c5c5c5;
  width: calc(100% + 80px);
  margin-left: -40px;
  border-radius: 10px;
  position: relative;
  @media screen and (max-width: 620px) {
    transition: height 0.2s ease-out;
    height: 0px;
    &:before {
      transition: height 0.2s ease-out;
      height: 0px !important;
    }
    &:after {
      transition: height 0.2s ease-out;
      height: 0px !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    background: #aaa;
  }
  &:before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background: #eee;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0px;
    left: 50%;
    width: 100px;
    margin-left: -50px;
    background: #aaa;
    height: 5px;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
`;
const IconAnimation = keyframes`
  from{
    opacity:0;
    transform:translate(0px, 10px) scale(0.9);
  }
  40%{
    opacity:0.8;
    transform:translate(0px, 0px);
  }
  52.5%{
    transform:rotate(5deg);
  }
  65%{
    transform:rotate(-5deg);
  }
  80%{
    opacity:0.8;
    transform:translate(0px, 0px);
  }
  100%{
    opacity:0;
    transform:translate(0px, 10px) scale(0.8);
  }
`;
const Icon = styled.div`
  font-size: 5em !important;
  font-weight: bold;
  font-family: monospace;
  user-select: none;
  color: #666;
  animation: ${IconAnimation} 2.5s ease-in-out infinite;
  @media (prefers-color-scheme: dark) {
    color: #555;
  }
  .material-icons {
    font-size: 1em !important;
    transform: translate(0px, 10px);
  }
`;
const Animation = () => {
  const loopTextArray = [
    <i className="material-icons">chat_bubble_outline</i>,
    <i className="material-icons">code</i>,
    "❤",
    <i className="material-icons">queue_music</i>
  ];
  const [loopText, setLoopText] = useState(0);
  const changeLoopText = value => {
    if (value >= loopTextArray.length) {
      setLoopText(1);
      setTimeout(changeLoopText.bind(null, 0), 2500);
    } else {
      setLoopText(value);
      setTimeout(changeLoopText.bind(null, value + 1), 2500);
    }
  };
  useEffect(() => {
    setTimeout(changeLoopText.bind(null, loopText + 1), 500);
  }, []);
  return (
    <Laptop>
      <LaptopScreen>
        <Icon key={loopText + Math.random() * 20}>
          {loopTextArray[loopText]}
        </Icon>
      </LaptopScreen>
      <LaptopKeyboard />
    </Laptop>
  );
};
export default Animation;
