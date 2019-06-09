![enter image description here](https://i.imgur.com/vOWvq0q.png)

React assistivetouch menu is a react component inspired from iOS assitivetouch.

#   ![Assistive touch Menu](https://im3.ezgif.com/tmp/ezgif-3-69990161eb79.gif)
 

## Installation

The easiest way to use react-select is to install it from npm and build it into your app with Webpack.
```bash
yarn add react-assistivetouch-menu
```

## Usage

```typescript
#App.tsx
import * as React from "react";
import { AssistiveTouch, MenuItem } from "react-assitivetouch-menu";

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
        <AssistiveTouch size="L" behaviour="freeflow" initialPos={this.initialPos} menuItems={this.getMenuItems()} />
      </div>
    );
  }
}

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)