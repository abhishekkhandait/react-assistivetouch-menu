import * as React from "react";
import { MenuBallPosition, MenuBallProps } from "./types";

import './styles.css';
import AssistiveTouchMenu from "./AssistiveTouchMenu";

interface MenuBallState {
	position: MenuBallPosition;
	isOpen: boolean;
}

export default class AssistiveTouch extends React.Component<MenuBallProps, MenuBallState> {
	private prePos: MenuBallPosition;
	private domRef: React.RefObject<HTMLDivElement>;
	private positionChanged: boolean;


	constructor(props, state) {
		super(props, state);
		this.domRef = React.createRef();
		this.state = {
			position: { top: 0, left: 0 },
			isOpen: false,
		}
	}

	componentDidMount() {
		this.setState({
			position: this.props.initialPos,
			isOpen: false,
		})
	}

	private setstyles() {
		return {
			top: `${this.state.position.top}px`,
			left: `${this.state.position.left}px`,
			transform: `scale(${this.state.isOpen ? '0' : '1'}`,
		}
	}

	private onMouseDown = (e) => {
		this.positionChanged = false;
		this.prePos = { left: e.clientX, top: e.clientY };
		window.addEventListener('mousemove', this.onMouseMove);
		window.addEventListener('mouseup', this.onMouseUp);
		window.addEventListener('touchmove', this.onTouchMove);
		window.addEventListener('touchend', this.onTouchEnd);
		window.addEventListener('touchcancel', this.onTouchEnd);
	}

	private onMouseMove = (e: MouseEvent | Touch) => {
		const diffPos = { left: this.prePos.left - e.clientX, top: this.prePos.top - e.clientY };
		this.positionChanged = true;
		// const bbox = this.domRef.current.getBoundingClientRect();
		const left = this.state.position.left - diffPos.left;
		const top = this.state.position.top - diffPos.top;
		// const right = bbox.right;
		// const bottom = bbox.bottom;
		this.setState({
			position: {
				left, top,
			}
		});
		/* if (top > 1 && left > 1 && (right - diffPos.left) < (window.innerWidth - 2) && (bottom - diffPos.top) < (window.innerHeight - 2)) {
		} */
		this.prePos = { left: e.clientX, top: e.clientY };
	}

	private onMouseUp = (e) => {
		this.removeListeners();
		!this.positionChanged && this.setState({ isOpen: !this.state.isOpen });
		this.positionChanged = false;
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
		window.removeEventListener('touchmove', this.onTouchMove);
		window.removeEventListener('touchend', this.onTouchEnd);
		window.removeEventListener('touchcancel', this.onTouchEnd);
	}

	private onClickOverlay = (e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (this.state.isOpen) {
			e.stopPropagation();
			this.setState({ isOpen: false });
		}
	}

	private renderMenu() {
		if (!this.positionChanged) {
			return <AssistiveTouchMenu menuItems={this.props.menuItems} open={this.state.isOpen} position={this.state.position} onClickOverlay={this.onClickOverlay} ></AssistiveTouchMenu>
		}
	}

	render() {
		return (
			<div className="assitivetouch-menu-container" ref={this.domRef}>
				<div className='menuball' style={this.setstyles()} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} >
					<div></div>
				</div>
				{
					this.renderMenu()
				}
			</div >
		);
	}
};
