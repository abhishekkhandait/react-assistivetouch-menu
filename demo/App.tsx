import * as React from "react";
import MenuBall from "../src/MenuBall";


export default class App extends React.Component<{}, {}> {
    private initialPos = { left: 0, top: 200 };
    render() {
        return (<div><MenuBall size='L' behaviour='freeflow' initialPos={this.initialPos} /></div >);
    }
}