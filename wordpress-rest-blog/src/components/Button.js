import styled from "styled-components";
import React, { useRef, useEffect } from "react";
/*
@property {String}  bg         - #08415c
@property {String}  color      - #ffffff
@property {String}  type       - null / "round" / "outline"
@property {String}  fontSize   - 1em
@property {String}  animLength - 0.5s
@property {String}  fontIcon   - CSS class / null
@property {Boolean} rippleOff  - false
(type == "round" && fontIcon !== undefined){
  @property {String} size      - 1em
}
*/
const StyledButton = styled.button`
  border: 2px solid ${props => props.bg || "#08415c"};
  outline: none;
  background-color: ${props => props.bg || "#08415c"};
  background: ${props => props.type === "outline" && "transparent"};
  border-radius: ${props => (props.type === "round" ? "50%" : "3px")};
  color: ${props => props.color || "#fff"};
  color: ${props => (props.type === "outline" ? props.bg || "#08415c" : "")};
  padding: ${props =>
    props.type === "round" ? "4px 8px 7px 9px" : "6px 14px"};
  font-size: ${props => props.fontSize || "0.9em"};
  overflow: hidden !important;
  position: relative !important;
  grid-template-rows: 1fr;
  margin-right: 2px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    padding: 50%;
    pointer-events: none;
    border-radius: 50%;
    left: calc(100% * var(--ripple-x));
    top: calc(100% * var(--ripple-y));
    transform: translate(-50%, -50%) scale(2);
    display: ${props => (props.rippleOff ? "none" : "block")};
    opacity: 0;
    transition: transform ${props => props.animLength || "1s"}
        cubic-bezier(0.455, 0.03, 0.515, 0.955),
      opacity ${props => props.animLength || "0.5s"}
        cubic-bezier(0.455, 0.03, 0.515, 0.955);
  }
  &:active:before {
    transition: 0s;
    opacity: 1;
    transform: translate(-50%, -50%) scale(0);
  }
  &:active {
    transform: translate(0px, 1px);
  }
  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }
  > i.hucomp-fonticon-but {
    font-size: ${props => props.fontIcon !== undefined && "1em"};
    padding-top: 7px !important;
  }
`;
const IconButton = styled(StyledButton)`
  > i.hucomp-fonticon-but {
    /* 
    margin-left: -14px;
    padding: 0 5px 0 8px; */
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 9px 0px;
    background: rgba(0, 0, 0, 0.5);
    width: 30px;
    text-align: center;
    user-select: none;
    pointer-events: none;
  }
  padding-left: 40px;
  border-color: rgba(0, 0, 0, 0.5);
`;
const RoundedIconButton = styled(StyledButton)`
  font-size: ${props => props.size || "1em"};
  width: calc(${props => props.size || "1em"} + 1em);
  height: calc(${props => props.size || "1em"} + 1em);
  line-height: ${props => props.size || "1em"};
  text-align: center;
`;
export const Button = props => {
  const button = useRef(null);
  useEffect(() => {
    let target = button.current;
    const eventListener = ev => {
      let el = ev.target;
      let x = (ev.clientX - el.offsetLeft) / el.offsetWidth;
      /* let y = (ev.clientY - el.offsetTop) / el.offsetHeight; */
      let y = 0.5;
      target.style.setProperty("--ripple-x", x);
      target.style.setProperty("--ripple-y", y);
    };
    target.addEventListener("mousedown", eventListener);
    return () => {
      target.removeEventListener("mousedown", eventListener);
    };
  }, [button]);
  if (props.fontIcon !== undefined && props.type !== "round") {
    return (
      <IconButton ref={button} {...props} className={props.className}>
        {props.fontIcon !== undefined && (
          <i className={"hucomp-fonticon-but material-icons " + props.fontIcon}>
            {props.fontIcon}
          </i>
        )}
        {props.children}
      </IconButton>
    );
  } else if (props.fontIcon !== undefined && props.type === "round") {
    return (
      <RoundedIconButton ref={button} {...props} className={props.className}>
        {props.fontIcon !== undefined && (
          <i className={"hucomp-fonticon-but " + props.fontIcon} />
        )}
        {props.children}
      </RoundedIconButton>
    );
  } else {
    return (
      <StyledButton ref={button} {...props} className={props.className}>
        {props.fontIcon !== undefined && (
          <i className={"hucomp-fonticon-but " + props.fontIcon} />
        )}
        {props.children}
      </StyledButton>
    );
  }
};
export default Button;
