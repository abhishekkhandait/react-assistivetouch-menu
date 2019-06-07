import * as React from "react";
import MenuBall from "../src/MenuBall";
import { IMenuBallPosition } from "../src/types";


export default class App extends React.Component<{}, {}> {
    private pos: IMenuBallPosition = {
        top: 100,
        left: 0,
    }
    render() {
        return (<div><MenuBall top={200} left={0} /></div >);
    }
}