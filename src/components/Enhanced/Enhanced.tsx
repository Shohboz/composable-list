import React from 'react';
import PropTypes from 'prop-types';

export type Props = {
  uniqueKey: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  sortActionCreator?: (params?) => void;
};

export default class Enhanced extends React.Component<Props> {
  static childContextTypes = {
    uniqueKey: PropTypes.string,
    sortActionCreator: PropTypes.func,
  };

  getChildContext() {
    const { uniqueKey, sortActionCreator } = this.props;
    return {
      uniqueKey,
      sortActionCreator,
    };
  }

  render() {
    const { style, className = '', children } = this.props;

    return (
      <div className={className || 'composable-list'} style={style}>
        {children}
      </div>
    );
  }
}
