export interface IMenuBallPosition {
  top: number;
  left: number;
}

export interface IMenuBallProps {
  behaviour: 'snapToSides' | 'freeflow';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
}

export interface IMenuItem {
  icon: HTMLElement;
  onclick?: () => void;
  childMenuItems?: IMenuItem[];
}
