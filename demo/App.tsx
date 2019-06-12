import * as React from "react";
import { AssistiveTouch, MenuItem } from "../src";

export default class App extends React.Component<{}, {}> {
  private initialPos = { left: 0, top: 200 };
  private getMenuItems(): MenuItem[] {
    return [
      {
        icon: <div className="menuitem">★</div>,
        label: "Custom"
      },
      {
        icon: <div className="menuitem">🖐</div>,
        label: "Gestures"
      },
      {
        icon: <div className="menuitem">⊕</div>,
        label: "Add"
      },
      {
        icon: <div className="menuitem">😴</div>,
        label: "Snooze"
      },
      {
        icon: <div className="menuitem">🍟</div>,
        label: "Fries"
      },
      {
        icon: <div className="menuitem">🙋</div>,
        label: "Hey"
      }
    ];
  }

  render() {
    return (
      <div>
        <AssistiveTouch
          size="L"
          behaviour='snapToSides'
          initialPos={this.initialPos}
          menuItems={this.getMenuItems()}
        />
      </div>
    );
  }
}
