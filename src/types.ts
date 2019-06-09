export interface MenuBallPosition {
  top: number;
  left: number;
}

export interface MenuBallProps {
  menuItems: MenuItem[];
  behaviour: 'snapToSides' | 'freeflow';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  initialPos?: MenuBallPosition;
}

export interface MenuItem {
  icon: JSX.Element;
  label: string;
  childMenuItems?: MenuItem[];
}

export interface AssistiveTouchMenuState {
  activeMenu: MenuItem | null;
  open: boolean;
}
