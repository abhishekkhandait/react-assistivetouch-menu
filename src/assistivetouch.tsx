import * as React from "react";
import { AssitiveTouchPosition, AssistiveTouchProps } from "./types";
import { AssistiveTouchMenu } from "./assistivetouchMenu";

import "./styles.css";

interface AssistiveTouchState {
	position: AssitiveTouchPosition;
	isOpen: boolean;
}

export class AssistiveTouch extends React.Component<AssistiveTouchProps, AssistiveTouchState> {
	private prePos: AssitiveTouchPosition;
	private domRef: React.RefObject<HTMLDivElement>;
	private positionChanged: boolean;
	private screen: { width: number, height: number };

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
		this.screen = {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
		}
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
		const diffPos = {
			left: e.clientX <= this.screen.width ? (e.clientX <= 0 ? this.state.position.left : this.prePos.left - e.clientX) : 0,
			top: e.clientY <= this.screen.height ? (e.clientY <= 0 ? this.state.position.top : this.prePos.top - e.clientY) : 0,
		};
		this.positionChanged = true;
		let left = this.state.position.left - diffPos.left;
		left > this.screen.width - this.domRef.current.clientWidth && (left = this.screen.width - this.domRef.current.clientWidth)
		let top = this.state.position.top - diffPos.top;
		top > this.screen.height - this.domRef.current.clientHeight && (top = this.screen.height - this.domRef.current.clientHeight)

		this.setState({
			position: {
				left: left < 0 ? 0 : left,
				top: top < 0 ? 0 : top,
			}
		});
		this.prePos = { left: e.clientX, top: e.clientY };
	};

	private onMouseUp = e => {
		if (this.positionChanged) {
			this.props.behaviour === 'snapToSides' && this.snapToSide(e);
		} else {
			this.setState({ isOpen: !this.state.isOpen });
		}
		this.removeListeners();
		this.positionChanged = false;
	};

	private snapToSide(e: MouseEvent | Touch) {
		let left = this.state.position.left;
		let top = this.state.position.top;

		/* const dLeft = e.clientX - this.screen.width / 2;
		const dTop = e.clientY - this.screen.height / 2;
		const snapTo = Math.min(Math.abs(dLeft), Math.abs(dTop));

		if (snapTo === Math.abs(dLeft)) {
			left = dLeft <= 0 ? 0 : this.screen.width - this.domRef.current.clientWidth;
		} else {
			top = dTop <= 0 ? 0 : this.screen.height - this.domRef.current.clientHeight;
		} */

		if (e.clientY <= this.screen.height / 2) {
			if (e.clientX <= this.screen.width / 2) {
				if (e.clientY <= e.clientX) {
					top = 0;
				} else {
					left = 0;
				}
			} else {
				if (e.clientY <= this.screen.width - e.clientX) {
					top = 0;
				} else {
					left = this.screen.width - this.domRef.current.clientWidth;
				}
			}
		} else {
			if (e.clientX <= this.screen.width / 2) {
				if (this.screen.height - e.clientY <= e.clientX) {
					top = this.screen.height - this.domRef.current.clientHeight;
				} else {
					left = 0;
				}
			} else {
				if (this.screen.height - e.clientY <= this.screen.width - e.clientX) {
					top = this.screen.height - this.domRef.current.clientHeight;
				} else {
					left = this.screen.width - this.domRef.current.clientWidth;
				}
			}
		}

		this.setState({ position: { left, top } });
	}

	private onTouchStart = (e: React.TouchEvent) => {
		e.preventDefault();
		this.onMouseDown(e.changedTouches[0]);
	};

	private onTouchMove = (e: TouchEvent) => {
		e.preventDefault();
		this.onMouseMove(e.changedTouches[0]);
	};

	private onTouchEnd = (e: TouchEvent) => {
		e.preventDefault();
		this.onMouseUp(e.changedTouches[0]);
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
