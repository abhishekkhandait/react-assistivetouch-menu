import * as React from "react";
import { IMenuBallPosition } from "./types";

import './styles.css';

export default class MenuBall extends React.Component<IMenuBallPosition, IMenuBallPosition> {
	private prePos: IMenuBallPosition;
	constructor(props, state) {
		super(props, state);
		this.state = { top: 0, left: 0 };
	}

	componentDidMount() {
		this.setState(this.props);
	}

	private setstyles() {
		return {
			top: `${this.state.top}px`,
			left: `${this.state.left}px`,
		}
	}

	private onMouseDown = (e) => {
		this.prePos = { left: e.clientX, top: e.clientY };
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
		window.addEventListener('touchmove', this.onTouchMove);
		window.addEventListener('touchend', this.onTouchEnd);
		window.addEventListener('touchcancel', this.onTouchEnd);
	}

	private onMouseMove = (e: MouseEvent | Touch) => {
		const diffPos = { left: this.prePos.left - e.clientX, top: this.prePos.top - e.clientY };
		this.setState({ left: this.state.left - diffPos.left, top: this.state.top - diffPos.top });
		this.prePos = { left: e.clientX, top: e.clientY };
	}

	private onMouseUp = (e) => {
		this.removeListeners();
	}

	private onTouchStart = (e: React.TouchEvent) => {
		e.preventDefault();
		this.onMouseDown(e.touches[0]);
	}

	private onTouchMove = (e: TouchEvent) => {
		e.preventDefault();
		this.onMouseMove(e.touches[0]);
	}

	private onTouchEnd = (e: TouchEvent) => {
		e.preventDefault();
		this.onMouseUp(e.touches[0]);
	}

	private removeListeners() {
		window.removeEventListener('mousemove', this.onMouseMove);
		window.removeEventListener('mouseup', this.onMouseUp);
	}

	render() {
		return <div className='menuball' style={this.setstyles()} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} ><div></div></div >;
	}
};
