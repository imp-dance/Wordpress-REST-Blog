import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
const AnimationContainer = props => {
  const loopTextArray = [
    <i className="material-icons">chat_bubble_outline</i>,
    <i className="material-icons">code</i>,
    "❤",
    <i className="material-icons">queue_music</i>
  ];
  const [loopIteration, setLoopIteration] = useState(0);
  const changeLoopText = value => {
    if (value >= loopTextArray.length) {
      setLoopIteration(1);
      setTimeout(changeLoopText.bind(null, 0), 2500);
    } else {
      setLoopIteration(value);
      setTimeout(changeLoopText.bind(null, value + 1), 2500);
    }
  };
  useEffect(() => {
    let timer = setTimeout(changeLoopText.bind(null, loopIteration + 1), 500);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line
  }, []);
  const iconKey = loopIteration + Math.random() * 20;
  return (
    <Animation
      loopIteration={loopIteration}
      loopTextArray={loopTextArray}
      dm={props.dm}
      onClick={props.onClick}
      iconKey={iconKey}
    />
  );
};
const Animation = ({ loopIteration, loopTextArray, dm, onClick, iconKey }) => {
  const dmClassName = dm ? "dm" : "";
  return (
    <Laptop className={dm ? "dm imp-laptop" : "imp-laptop"} onClick={onClick}>
      <LaptopScreen className={dmClassName}>
        <Noise className={dmClassName} />
        <Icon key={iconKey} className={dmClassName}>
          {loopTextArray[loopIteration]}
        </Icon>
      </LaptopScreen>
      <LaptopKeyboard />
    </Laptop>
  );
};
AnimationContainer.propTypes = {
  dm: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
AnimationContainer.defaultProps = {
  onClick: () => {}
};
export default AnimationContainer;

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
  will-change: transform, opacity;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
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
  position: relative;
  overflow: hidden;
  z-index: 50;
  &.dm {
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
  transition: transform 0.2s ease-in-out;
  width: 100%;
  max-width: 500px;
  margin: 100px auto 70px;
  will-change: transform, opacity;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  cursor: pointer;
  @media screen and (max-width: 800px) {
    padding: 0 20px;
  }
  &:hover {
    transform: scale(1.01);
  }
  &:active {
    transition: transform 0.1s ease-in-out;
    transform: scale(0.99);
  }
`;
const LaptopKeyboard = styled.div`
  height: 15px;
  background: #c5c5c5;
  width: calc(100% + 80px);
  margin-left: -40px;
  border-radius: 10px;
  will-change: transform, height;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
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
  &.dm {
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
    opacity:1;
    transform:translate(0px, 0px) rotate(3deg);
  }
  52.5%{
    transform:rotate(5deg);
  }
  65%{
    transform:rotate(-6deg);
  }
  80%{
    opacity:1;
    transform:translate(0px, 0px) rotate(-3deg);
  }
  95%{
    transform:translate(0px, 9px) rotate(2deg) scale(0.9);
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
  will-change: transform, opacity;
  user-select: none;
  color: #666;
  min-width: 110px;
  position: relative;
  z-index: 3;
  animation: ${IconAnimation} 2.4s ease-in-out infinite;
  -webkit-transform: translateZ(0);
  -moz-transform: translateZ(0);
  -ms-transform: translateZ(0);
  -o-transform: translateZ(0);
  transform: translateZ(0);
  &.dm {
    color: #555;
  }
  .material-icons {
    font-size: 1em !important;
    transform: translate(0px, 10px);
  }
`;
const NoiseAnimation = keyframes`
  0% {
    transform: translateX(0px,0px); }
  10% {
    transform: translate(-100px, 100px);
  }
  20% {
    transform: translate(150px, -100px);
  }
  30% {
    transform: translate(-100px,100px);
  }
  40% {
    transform: translate(100px, -150px);
  }
  50% {
    transform: translate(-100px, 200px);
  }
  60% {
    transform: translate(-200px, -100px);
  }
  70% {
    transform: translateY(50px, 100px);
  }
  80% {
    transform: translate(100px, -150px);
  }
  90% {
    transform: translate(0px, 200px);
  }
  100% {
    transform: translate(-100px, 100px);
  }
`;
const Noise = styled.div`
  position: absolute;
  top: -500px;
  right: -500px;
  bottom: -500px;
  left: -500px; // prettier-ignore
  background: transparent url('https://haakon.underbakke.net/images/noise-min.png?raw=1') 0 0;
  background-size: 320px 320px;
  opacity: 0.7;
  animation: ${NoiseAnimation} 1s steps(8, end) infinite both;
  &.dm {
    opacity: 0.05;
  }
`;
