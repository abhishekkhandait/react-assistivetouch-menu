![enter image description here](https://i.imgur.com/vOWvq0q.png)

React assistivetouch menu is a react component inspired from iOS assitivetouch.

[![npm badge](https://img.shields.io/npm/v/react-assistivetouch-menu.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/react-assistivetouch-menu)[![Greenkeeper badge](https://badges.greenkeeper.io/abhishekkhandait/react-assistivetouch-menu.svg?style=flat-square)](https://greenkeeper.io/) [![travis-ci badge](https://img.shields.io/travis/abhishekkhandait/react-assistivetouch-menu/master.svg?style=flat-square&logo=travis)](https://travis-ci.org/abhishekkhandait/react-assistivetouch-menu) [![downloads badge](https://img.shields.io/npm/dt/react-assistivetouch-menu.svg?style=flat-square)]([https://www.npmjs.com/package/react-assistivetouch-menu)

# ![Assistive touch Menu](https://media.giphy.com/media/QaeDPpRDexSeSW9ZDN/giphy.gif)

[Demo](https://codesandbox.io/s/modest-surf-glql8)

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
