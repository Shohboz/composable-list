import * as React from 'react';

export type Props = {
  title: string | React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const NavigationItem: React.FunctionComponent<Props> = ({
  title,
  disabled,
  onClick,
  active,
}) => (
  <li className={`${disabled ? 'disabled' : ''} ${active ? 'active' : ''}`}>
    <a onClick={onClick}>
      <span aria-hidden="true">{title}</span>
    </a>
  </li>
);

export default NavigationItem;
