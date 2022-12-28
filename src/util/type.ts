export type MenuProfileTypes = {
  id: number;
  name: string;
  path: string;
};

export type ButtonsTypes = {
  type: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  title: string;
  isPrimary?: boolean;
  isSecondary?: boolean;
  onClick: () => void;
};

export type ItemMenuSettingTypes = {
  children: React.ReactNode;
  duration: number;
  onClick: () => void;
};
