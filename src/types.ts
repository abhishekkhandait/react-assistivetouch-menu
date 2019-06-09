export interface AssitiveTouchPosition {
  top: number;
  left: number;
}

export interface AssistiveTouchProps {
  menuItems: MenuItem[];
  behaviour: 'snapToSides' | 'freeflow';
  size: 'XS' | 'S' | 'M' | 'L' | 'XL';
  initialPos?: AssitiveTouchPosition;
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
