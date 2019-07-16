![React Assistivetouch Menu](https://i.imgur.com/vOWvq0q.png)

React assistivetouch menu is a react component inspired from iOS assitivetouch.

[![npm badge](https://img.shields.io/npm/v/react-assistivetouch-menu.svg?style=flat-square&logo=npm)](https://www.npmjs.com/package/react-assistivetouch-menu) [![Greenkeeper badge](https://badges.greenkeeper.io/abhishekkhandait/react-assistivetouch-menu.svg?style=flat-square)](https://greenkeeper.io/) [![travis-ci badge](https://img.shields.io/travis/abhishekkhandait/react-assistivetouch-menu/master.svg?style=flat-square&logo=travis)](https://travis-ci.org/abhishekkhandait/react-assistivetouch-menu) [![downloads badge](https://img.shields.io/npm/dt/react-assistivetouch-menu.svg?style=flat-square)]([https://www.npmjs.com/package/react-assistivetouch-menu) [![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabhishekkhandait%2Freact-assistivetouch-menu.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabhishekkhandait%2Freact-assistivetouch-menu?ref=badge_shield)

![Assistive touch Menu](https://i.imgur.com/4ZCdLnT.gif)

[JS Example](https://codesandbox.io/s/epic-merkle-964y1) | [TypeScript Example](https://codesandbox.io/s/modest-surf-glql8)

## Installation

The easiest way to use react-select is to install it from npm and build it into your app with Webpack.

```bash
yarn add react-assistivetouch-menu
```
or
```bash
npm install react-assistivetouch-menu --save
```
or
```bash
<script src="https://unpkg.com/react-assistivetouch-menu@0.0.2/dist/index.js"></script>
```

## Usage

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { AssistiveTouch } from "react-assistivetouch-menu";

function getMenuItems() {
  return [{
      icon: <div className="menuitem">★</div>,
      label: "Custom"
    },{
      icon: <div className="menuitem">🖐</div>,
      label: "Gestures"
    },{
      icon: <div className="menuitem">⊕</div>,
      label: "Add"
    },{
      icon: <div className="menuitem">😴</div>,
      label: "Snooze"
    },{
      icon: <div className="menuitem">🍟</div>,
      label: "Fries"
    },{
      icon: <div className="menuitem">🙋</div>,
      label: "Hey"
    }];
}

function App() {
  return (
    <AssistiveTouch size="L" behaviour="snapToSides" initialPos={{ left: 0, top: 200 }} menuItems={getMenuItems()}
    />
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```
## Props

| prop                         | type      | description                                                                                                                                    |
| ---------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `menuItems`                   | `array`    | Array of `items` to be added to menu. `item` is object having 2 properties. 'icon' which has to be a JSX Element and `label` for the icon. Ex. `menuItems=[{icon: <ABC></ABC>, label: 'ABC'}]`                                                                           |
| `behaviour`                    | `'snapToSides' | 'freeflow'`  | specify the behaviour of assistive touch menu ball. Default: `snapToSides`                                                                                        |
| `size`                    | `'XS' | 'S' | 'M' | 'L' | 'XL'`  | Specify the size of menu. Default: `M`                                                                                                   |
| `initialPos`             | `object`    | Specify the initial position of menu ball. Position has to be passed as object `{left: number, top: number}`. Default: `{left: 0, top: 0}` |


## Development

### Build
1. `yarn`
2. `yarn build`
 ### Debug
 To debug you can run demo app and test your changes over it. Just run `yarn start:demo` which will fire up dev server on `http://localhost:9000`  for testing and debugging the component.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License
Copyright (c) 2019 Abhishek Khandait

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fabhishekkhandait%2Freact-assistivetouch-menu.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fabhishekkhandait%2Freact-assistivetouch-menu?ref=badge_large)