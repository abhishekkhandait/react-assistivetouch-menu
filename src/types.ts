export interface MenuBallPosition {
  top: number;
  left: number;
}

export interface MenuBallProps {
  behaviour: 'snapToSides' | 'freeflow';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  initialPos?: MenuBallPosition;
  onClick?: () => void;
}

export interface MenuItem {
  icon: HTMLElement;
  onclick?: () => void;
  childMenuItems?: MenuItem[];
}

export interface MenuState {
  activeMenu: MenuItem | null;
  open: boolean;
}
