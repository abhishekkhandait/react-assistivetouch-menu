import * as React from "react";
import { MenuItem, MenuState } from "./types";

interface MenuProps {
    menuItems: MenuItem[];
    open: boolean;
}

export default class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps, state: MenuState) {
        super(props, state);
        this.state = {
            activeMenu: null,
            open: false,
        };
    }

    render() {
        return (
            <div className='assistivetouch-menu-overlay'>
                <div className={`assistivetouch-menu-content ${this.props.open && 'open'}`}></div>
            </div>
        )
    }
}
