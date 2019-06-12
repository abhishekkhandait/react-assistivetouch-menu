import * as React from "react";
import { AssitiveTouchPosition, AssistiveTouchProps } from "./types";
import { AssistiveTouchMenu } from "./assistivetouchMenu";

import "./styles.css";

interface AssistiveTouchState {
  position: AssitiveTouchPosition;
  isOpen: boolean;
}

export class AssistiveTouch extends React.Component<
  AssistiveTouchProps,
  AssistiveTouchState
  > {
  private prePos: AssitiveTouchPosition;
  private domRef: React.RefObject<HTMLDivElement>;
  private positionChanged: boolean;

  constructor(props, state) {
    super(props, state);
    this.domRef = React.createRef();
    this.state = {
      position: { top: 0, left: 0 },
      isOpen: false
    };
  }

  componentDidMount() {
    this.setState({
      position: this.props.initialPos,
      isOpen: false
    });
  }

  private setstyles() {
    return {
      top: `${this.state.position.top}px`,
      left: `${this.state.position.left}px`,
      transform: `scale(${this.state.isOpen ? "0" : "1"}`
    };
  }

  private onMouseDown = e => {
    this.positionChanged = false;
    this.prePos = { left: e.clientX, top: e.clientY };
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
    window.addEventListener("touchmove", this.onTouchMove);
    window.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("touchcancel", this.onTouchEnd);
  };

  private onMouseMove = (e: MouseEvent | Touch) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const diffPos = {
      left: e.clientX <= w ? (e.clientX <= 0 ? this.state.position.left : this.prePos.left - e.clientX) : 0,
      top: e.clientY <= h ? (e.clientY <= 0 ? this.state.position.top : this.prePos.top - e.clientY) : 0,
    };
    this.positionChanged = true;
    let left = this.state.position.left - diffPos.left;
    left > w - this.domRef.current.clientWidth && (left = w - this.domRef.current.clientWidth)
    let top = this.state.position.top - diffPos.top;
    top > h - this.domRef.current.clientHeight && (top = h - this.domRef.current.clientHeight)

    this.setState({
      position: {
        left: left < 0 ? 0 : left,
        top: top < 0 ? 0 : top,
      }
    });
    this.prePos = { left: e.clientX, top: e.clientY };
  };

  private onMouseUp = e => {
    this.removeListeners();
    !this.positionChanged && this.setState({ isOpen: !this.state.isOpen });
    this.positionChanged = false;
  };

  private onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    this.onMouseDown(e.touches[0]);
  };

  private onTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    this.onMouseMove(e.touches[0]);
  };

  private onTouchEnd = (e: TouchEvent) => {
    e.preventDefault();
    this.onMouseUp(e.touches[0]);
  };

  private removeListeners() {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("touchmove", this.onTouchMove);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchcancel", this.onTouchEnd);
  }

  private onClickOverlay = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.isOpen) {
      e.stopPropagation();
      this.setState({ isOpen: false });
    }
  };

  private renderMenu() {
    if (!this.positionChanged) {
      return <AssistiveTouchMenu menuItems={this.props.menuItems} open={this.state.isOpen} position={this.state.position} onClickOverlay={this.onClickOverlay} />;
    }
  }

  render() {
    return (
      <div className="assitivetouch-menu-container">
        <div className="menuball" ref={this.domRef} style={this.setstyles()} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart}><div className="menuball_placeholder"></div></div>
        {this.renderMenu()}
      </div >
    );
  }
}
