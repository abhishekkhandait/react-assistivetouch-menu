import * as React from "react";

import { MenuItem, AssistiveTouchMenuState, AssitiveTouchPosition } from "./types";

interface AssistiveTouchMenuProps {
    menuItems: MenuItem[];
    open: boolean;
    position: AssitiveTouchPosition;
    onClickOverlay: (e) => void;
}

export class AssistiveTouchMenu extends React.Component<AssistiveTouchMenuProps, AssistiveTouchMenuState> {
    private domRef: React.RefObject<HTMLDivElement>;
    constructor(props: AssistiveTouchMenuProps, state: AssistiveTouchMenuState) {
        super(props, state);
        this.domRef = React.createRef();
        this.state = {
            activeMenu: null,
            open: false,
        };
    }

    private handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    private setMenuPosition() {
        let pos, scale;
        if (!this.props.open && this.domRef.current !== null) {
            const bbox = this.domRef.current.getBoundingClientRect();
            scale = 0;
            pos = [this.props.position.left - (bbox.left + bbox.width / 2) + 25, this.props.position.top - (bbox.top + bbox.height / 2) + 25];
        }
        else {
            scale = 1;
            pos = [0, 0];
        }
        return {
            transform: `translate(${pos[0]}px, ${pos[1]}px) scale(${scale})`
        }
    }

    private getMenuItems() {
        const r = 80;
        const l = this.props.menuItems.length;
        return this.props.menuItems.map((menuItem, i) => {
            const angle = 360 * (i) / l;
            const x = Math.round(r * Math.cos(angle * Math.PI / 180) * 100) / 100;
            const y = Math.round(-r * Math.sin(angle * Math.PI / 180) * 100) / 100;
            const _style = {
                transform: `translate(${x}px, ${y}px)`,
            }
            return (<div className='assistivetouch-menu-item' style={_style} key={i}>
                {menuItem.icon}
                <label>{menuItem.label}</label>
            </div>)
        });
    }

    render() {
        return (
            <div className='assistivetouch-menu-overlay' onClick={this.props.onClickOverlay} onTouchStart={this.props.onClickOverlay} >
                <div ref={this.domRef} style={this.setMenuPosition()} className={`assistivetouch-menu-content ${this.props.open ? 'open' : ''}`} onClick={this.handleClick} onTouchStart={this.handleClick}>
                    {this.getMenuItems()}
                </div>
            </div >
        )
    }
}
